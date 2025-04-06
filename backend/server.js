require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const pdf = require('pdf-parse');
const fs = require('fs');

const app = express();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Gemini API Configuration
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = process.env.GEMINI_API_KEY;

// ATS Scoring Configuration
const ATS_KEYWORDS = {
  technical: ['python', 'java', 'javascript', 'react', 'node.js', 'sql', 'aws', 'docker', 'git'],
  softSkills: ['communication', 'teamwork', 'leadership', 'problem-solving', 'adaptability'],
  education: ['bachelor', 'master', 'phd', 'degree', 'certification'],
  experience: ['internship', 'freelance', 'full-time', 'part-time', 'remote'],
  achievements: ['increased', 'reduced', 'improved', 'developed', 'optimized']
};

const MAX_SCORE = 100;
const SECTION_WEIGHTS = {
  technical: 0.4,
  softSkills: 0.2,
  education: 0.15,
  experience: 0.15,
  achievements: 0.1
};

// Helper function to calculate ATS score
function calculateATSScore(text) {
  let score = 0;
  const textLower = text.toLowerCase();

  for (const [section, keywords] of Object.entries(ATS_KEYWORDS)) {
    const matches = keywords.filter(keyword => textLower.includes(keyword));
    score += (matches.length / keywords.length) * SECTION_WEIGHTS[section] * MAX_SCORE;
  }

  const hasSections = ['education', 'experience', 'skills'].some(section => textLower.includes(section));
  if (hasSections) score += 5;

  return Math.min(Math.max(score, 0), MAX_SCORE);
}

// Helper function to extract resume text
async function extractResumeText(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1].content;

    // Validate API key
    if (!API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const systemPrompt = {
      role: "user",
      parts: [{
        text: `You are an AI Career Assistant. Answer only career-related queries. Make your responses visually appealing and well-structured.
        
        Topics: 
        - Resume building and optimization
        - Job hunting strategies
        - Interview preparation and tips
        - Skill recommendations for various fields
        - ATS optimization and keywords
        - Career transition advice
        - Professional development
        
        FORMAT YOUR RESPONSES CAREFULLY:
        - Use # for main titles (use sparingly)
        - Use ## for major sections
        - Use ### for subsections
        - Use **bold** for important concepts
        - Use *italic* for emphasis
        - Use ***highlighted*** for key terms
        - Use numbered lists (1., 2., etc.) for sequential steps
        - Use bullet points (- or *) for non-sequential lists
        - Use \`inline code\` for technical terms
        - Use \`\`\`code blocks\`\`\` for multi-line code
        
        STRUCTURE YOUR RESPONSES:
        - Start with a brief introduction
        - Organize content into logical sections with clear headings
        - Use short paragraphs (2-3 sentences)
        - Include bullet points for easy scanning
        - End with a concise summary or call to action
        
        If a query is unrelated, respond with:
        "I can help with career-related questions. Please ask about job search, interviews, or resume improvements!"`
      }]
    };

    const response = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        contents: [
          systemPrompt,
          { role: "user", parts: [{ text: userMessage }] }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    // Verify response structure and provide fallback
    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response structure from Gemini API');
    }

    const reply = response.data.candidates[0].content.parts[0].text;
    const formattedReply = formatResponse(reply);

    res.json({
      success: true,
      reply: formattedReply
    });

  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate response. Please try again.',
      details: error.message
    });
  }
});

// Helper function to format the response
function formatResponse(text) {
  // Step 1: Handle markdown headers - improved regex to ensure headers are properly captured
  let formattedText = text
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.*?)$/gm, '<h4>$1</h4>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>'); // Added support for # headers
  
  // Step 2: Handle styling elements - improved regex for bold, italic, and highlighted text
  formattedText = formattedText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<span class="kh-highlight">$1</span>');
  
  // Step 3: Handle numbered and bullet lists - improved multi-line handling
  // Find potential list blocks
  const listBlockRegex = /((?:^[0-9]+\.\s+.*$\n?)+|(?:^[-*]\s+.*$\n?)+)/gm;
  const listBlocks = formattedText.match(listBlockRegex) || [];
  
  // Process each list block
  listBlocks.forEach(block => {
    let processedBlock;
    
    if (block.match(/^[0-9]+\.\s+/m)) {
      // Numbered list - improved to handle multi-line items
      const listItems = block.split(/\n/).filter(line => line.trim() !== '');
      processedBlock = '<ol>\n' + 
        listItems.map(item => {
          const content = item.replace(/^[0-9]+\.\s+/, '');
          return `<li>${content}</li>`;
        }).join('\n') + 
        '\n</ol>';
    } else {
      // Bullet list - improved to handle multi-line items and both * and - markers
      const listItems = block.split(/\n/).filter(line => line.trim() !== '');
      processedBlock = '<ul>\n' + 
        listItems.map(item => {
          const content = item.replace(/^[-*]\s+/, '');
          return `<li>${content}</li>`;
        }).join('\n') + 
        '\n</ul>';
    }
    
    formattedText = formattedText.replace(block, processedBlock);
  });
  
  // Step 4: Add special styling for highlighted content and sections
  formattedText = formattedText
    .replace(/(Skills:|Essential Skills:|Mathematics & Statistics:|Programming:|Data Wrangling & Cleaning:|Machine Learning:|Data Visualization:|Databases & SQL:|Helpful Skills:|Big Data Technologies:|Deep Learning:|Communication & Storytelling:|Education & Training:|Formal Education:|Online Courses & Certifications:|Bootcamps:|Building Your Portfolio:|Personal Projects:|Kaggle Competitions:|Contribute to Open Source Projects:|Job Hunting Strategies:|Tailor Your Resume:|Network:|Apply for Internships:|Practice Interview Questions:|Resume Building Tips:)/g, 
    '<strong class="kh-section-title">$1</strong>');
  
  // Step 5: Handle code blocks
  formattedText = formattedText.replace(/```(.*?)```/gs, (match, codeContent) => {
    return `<pre><code>${codeContent.trim()}</code></pre>`;
  });
  
  // Step 6: Handle inline code
  formattedText = formattedText.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Step 7: Handle paragraphs and line breaks
  formattedText = formattedText
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  // Wrap in paragraph tags if not already wrapped with a block element
  if (!formattedText.startsWith('<h') && 
      !formattedText.startsWith('<p>') && 
      !formattedText.startsWith('<ol') && 
      !formattedText.startsWith('<ul')) {
    formattedText = '<p>' + formattedText + '</p>';
  }
  
  // Step 8: Ensure all content is wrapped in a div with proper class
  formattedText = `<div class="kh-formatted-content">${formattedText}</div>`;
  
  return formattedText;
}

// Resume Upload & ATS Analysis
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Verify file is a PDF
    if (!req.file.mimetype || !req.file.mimetype.includes('pdf')) {
      fs.unlinkSync(req.file.path);
      throw new Error('Only PDF files are supported');
    }

    // Extract text from resume
    const resumeText = await extractResumeText(req.file.path);
    
    // Calculate ATS score
    const atsScore = calculateATSScore(resumeText);

    // Get keywords found in resume
    const keywordsFound = Object.entries(ATS_KEYWORDS).reduce((acc, [category, keywords]) => {
      const found = keywords.filter(keyword => resumeText.toLowerCase().includes(keyword));
      if (found.length > 0) {
        acc[category] = found;
      }
      return acc;
    }, {});

    // Use Gemini to generate detailed feedback
    const feedbackResponse = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{
              text: `You are a resume expert. Analyze this resume for ATS optimization and provide constructive feedback. Focus on:
              1. Keywords and skills present or missing
              2. Format and structure improvements
              3. Content suggestions
              4. ATS compatibility tips
              
              Keep your analysis brief and actionable. Here's the resume text:
              ${resumeText}`
            }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const feedback = feedbackResponse.data.candidates[0].content.parts[0].text;
    const formattedFeedback = formatResponse(feedback);

    res.json({
      success: true,
      analysis: {
        score: Math.round(atsScore),
        feedback: formattedFeedback,
        keywordsFound
      },
      fileName: req.file.originalname
    });

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

  } catch (error) {
    console.error('Upload Error:', error);
    
    // Clean up file if it exists and there was an error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    
    res.status(400).json({
      success: false,
      error: error.message || 'Resume analysis failed'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'An unexpected error occurred'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));