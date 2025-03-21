# Document Anonymizer

A sleek, space-themed web application that helps you anonymize sensitive information in your documents through a guided step-by-step process.

![Document Anonymizer Screenshot](screenshot.png)

## Features

- **Step-by-step Guided Process**: Easy-to-follow workflow for anonymizing documents
- **Multiple File Format Support**: Process DOCX, TXT, and CSV files
- **Custom Anonymization Rules**: Define and categorize words that should be anonymized
- **Real-time Preview**: See the original and anonymized content side by side
- **Export & Import Rules**: Save and reuse your anonymization rules
- **Beautiful Space Theme**: Modern UI with a cosmic design

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/document-anonymizer.git
cd document-anonymizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## How to Use

### Step 1: Upload a Document

Drag and drop your file or click to select a file from your computer. Supported formats are .docx, .txt, and .csv.

### Step 2: Define Sensitive Information

Add words or phrases you want to anonymize. For each entry, you can:
- Choose a category (name, company, ID number, etc.)
- Specify a custom replacement text or use auto-generated values
- Import/export your list of banned words for reuse

### Step 3: Preview and Download

Review the original and anonymized versions side by side, then download the anonymized document.

## Customization

You can customize the anonymization rules to fit your specific needs:

- **Categories**: The application comes with predefined categories like name, company, email, etc.
- **Replacement Text**: You can define custom replacement text for each sensitive term
- **Export/Import**: Save your anonymization rules to reuse them later

## Project Structure

```
src/
├── components/         # UI components
│   ├── StepByStep/     # Step-by-step interface components
├── hooks/              # Custom React hooks
├── pages/              # Application pages
├── utils/              # Utility functions
│   ├── fileProcessors/ # File processing utilities
├── types/              # TypeScript type definitions
└── styles/             # CSS styles
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The space background image is from [Unsplash](https://unsplash.com/)
- Document processing is powered by [mammoth.js](https://github.com/mwilliamson/mammoth.js) and [PapaParse](https://www.papaparse.com/)