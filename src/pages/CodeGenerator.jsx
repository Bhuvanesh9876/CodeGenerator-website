import React, { useState } from 'react';
import { codeService } from "../services/api";
import { Copy, Check, Play, FileCode } from 'lucide-react';

const CodeGenerator = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    language: 'javascript',
    includeComments: true,
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const languages = [
    'javascript', 'python', 'java', 'cpp', 'csharp', 'php', 
    'ruby', 'go', 'rust', 'typescript', 'swift', 'kotlin'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenerateCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    if (!formData.prompt.trim()) {
      setError('Please enter a description of what you want to code');
      setLoading(false);
      return;
    }

    try {
      const response = await codeService.generateCode(
        formData.prompt, 
        formData.language,
        formData.includeComments
      );
      setGeneratedCode(response.data.code);
      setSuccessMessage('Code generated successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to generate code';
      setError(errorMsg);
    }
    
    setLoading(false);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleClear = () => {
    setGeneratedCode('');
    setFormData({ prompt: '', language: 'javascript', includeComments: true });
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FileCode className="h-8 w-8 text-blue-600" />
          Code Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Generate code in any programming language using AI
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-left">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-left">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-left">
              Generate Programming Code
            </h2>
            
            <form onSubmit={handleGenerateCode} className="space-y-4">
              <div className="text-left">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Describe what you want to code
                </label>
                <textarea
                  id="prompt"
                  name="prompt"
                  rows="4"
                  required
                  value={formData.prompt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-left"
                  placeholder="e.g., Create a function that takes an array of numbers and returns the sum of all even numbers..."
                />
              </div>

              <div className="text-left">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Programming Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-left"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang} className="text-left">
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comments Checkbox */}
              <div className="flex items-center text-left">
                <input
                  id="includeComments"
                  name="includeComments"
                  type="checkbox"
                  checked={formData.includeComments}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="includeComments" className="ml-2 block text-sm text-gray-700 text-left">
                  Include comments in generated code
                </label>
              </div>

              <div className="flex gap-3 text-left">
                <button
                  type="submit"
                  disabled={loading || !formData.prompt}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  {loading ? 'Generating Code...' : 'Generate Code'}
                </button>
                
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-3 text-left">💡 Tips for Better Results</h3>
            <ul className="text-blue-800 text-sm space-y-2 text-left">
              <li className="text-left">• Be specific about the programming language and requirements</li>
              <li className="text-left">• Include input/output examples when possible</li>
              <li className="text-left">• Mention any specific libraries or frameworks</li>
              <li className="text-left">• Describe error handling requirements</li>
              <li className="text-left">• Use the checkbox above to include/exclude code comments</li>
            </ul>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4 text-left">
            <h2 className="text-xl font-semibold text-gray-900 text-left">Generated Code</h2>
            {generatedCode && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {generatedCode ? (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-left">
              {generatedCode}
            </pre>
          ) : (
            <div className="text-gray-500 text-center py-12">
              <FileCode className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-center">Your generated code will appear here</p>
              <p className="text-sm mt-2 text-center">Describe your code requirements and click Generate</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// Ensure proper mobile layout
<div className="generator-container mobile-optimized">
  {/* Form and output sections stacked vertically on mobile */}
</div>

export default CodeGenerator;