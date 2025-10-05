/*import React, { useState } from 'react';
import { codeService } from "../services/api"; // FIXED IMPORT PATH
import { Copy, Check, Database, FileText } from 'lucide-react';

const SQLGenerator = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    databaseType: 'mysql',
  });
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const databaseTypes = [
    'mysql', 'postgresql', 'sqlite', 'mongodb', 'oracle', 'sqlserver'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateSQL = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    if (!formData.prompt.trim()) {
      setError('Please enter a description of the SQL query you need');
      setLoading(false);
      return;
    }

    try {
      const response = await codeService.generateSQL(formData.prompt, formData.databaseType);
      setGeneratedSQL(response.data.code);
      setSuccessMessage('SQL query generated successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to generate SQL';
      setError(errorMsg);
    }
    
    setLoading(false);
  };

  const handleCopySQL = async () => {
    try {
      await navigator.clipboard.writeText(generatedSQL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy SQL:', err);
    }
  };

  const handleClear = () => {
    setGeneratedSQL('');
    setFormData({ prompt: '', databaseType: 'mysql' });
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Database className="h-8 w-8 text-green-600" />
          SQL Query Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Generate optimized SQL queries for different databases using AI
        </p>
      </div>

      {/* Success Message */{
      //{successMessage && (
        /*<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {successMessage}
        </div>
      //)}

      {/* Error Message */}
      /*{error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */
        /*<div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Generate SQL Query
            </h2>
            
            <form onSubmit={handleGenerateSQL} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the SQL query you need
                </label>
                <textarea
                  id="prompt"
                  name="prompt"
                  rows="4"
                  required
                  value={formData.prompt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="e.g., Query to find all customers who have made purchases above $1000 in the last month..."
                />
              </div>

              <div>
                <label htmlFor="databaseType" className="block text-sm font-medium text-gray-700 mb-2">
                  Database Type
                </label>
                <select
                  id="databaseType"
                  name="databaseType"
                  value={formData.databaseType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  {databaseTypes.map((db) => (
                    <option key={db} value={db}>
                      {db.charAt(0).toUpperCase() + db.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !formData.prompt}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Database className="h-5 w-5" />
                  {loading ? 'Generating SQL...' : 'Generate SQL Query'}
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

          {/* Tips Section */
          /*<div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-900 mb-3">💡 Tips for Better SQL Results</h3>
            <ul className="text-green-800 text-sm space-y-2">
              <li>• Describe the table structure if possible</li>
              <li>• Specify the type of query (SELECT, INSERT, UPDATE, DELETE)</li>
              <li>• Mention any specific conditions or filters needed</li>
              <li>• Include sorting or grouping requirements</li>
              <li>• Specify if you need JOIN operations</li>
            </ul>
          </div>
        </div>

        {/* Output Section */
        /*<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Generated SQL Query</h2>
            {generatedSQL && (
              <button
                onClick={handleCopySQL}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {generatedSQL ? (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {generatedSQL}
            </pre>
          ) : (
            <div className="text-gray-500 text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Your generated SQL query will appear here</p>
              <p className="text-sm mt-2">Describe your database requirements and click Generate</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SQLGenerator;*/