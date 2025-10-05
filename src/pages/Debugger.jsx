import React, { useState } from 'react';
import { debugService } from '../services/api';
import { Bug, Play, Copy, Check, BookOpen } from 'lucide-react';

const Debugger = () => {
  const [activeTab, setActiveTab] = useState('debug');
  
  const [debugData, setDebugData] = useState({
    code: '',
    language: 'javascript',
    errorMessage: '',
  });
  const [debugResult, setDebugResult] = useState('');
  const [debugLoading, setDebugLoading] = useState(false);
  
  const [explainData, setExplainData] = useState({
    code: '',
    language: 'javascript',
  });
  const [explanation, setExplanation] = useState('');
  const [explainLoading, setExplainLoading] = useState(false);
  
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const languages = [
    'javascript', 'python', 'java', 'cpp', 'csharp', 'php', 
    'ruby', 'go', 'rust', 'typescript'
  ];

  const handleDebugChange = (e) => {
    setDebugData({
      ...debugData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDebugCode = async (e) => {
    e.preventDefault();
    setDebugLoading(true);
    setError('');
    setSuccessMessage('');
    
    if (!debugData.code.trim()) {
      setError('Please enter some code to debug');
      setDebugLoading(false);
      return;
    }

    try {
      const response = await debugService.debugCode(debugData.code, debugData.language, debugData.errorMessage);
      setDebugResult(response.data.result);
      setSuccessMessage('Code debugged successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to debug code';
      setError(errorMsg);
    }
    
    setDebugLoading(false);
  };

  const handleExplainChange = (e) => {
    setExplainData({
      ...explainData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExplainCode = async (e) => {
    e.preventDefault();
    setExplainLoading(true);
    setError('');
    setSuccessMessage('');
    
    if (!explainData.code.trim()) {
      setError('Please enter some code to explain');
      setExplainLoading(false);
      return;
    }

    try {
      const response = await debugService.explainCode(explainData.code, explainData.language);
      setExplanation(response.data.explanation);
      setSuccessMessage('Code explained successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to explain code';
      setError(errorMsg);
    }
    
    setExplainLoading(false);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClear = () => {
    if (activeTab === 'debug') {
      setDebugData({ code: '', language: 'javascript', errorMessage: '' });
      setDebugResult('');
    } else {
      setExplainData({ code: '', language: 'javascript' });
      setExplanation('');
    }
    setError('');
    setSuccessMessage('');
  };

  const getCurrentCode = () => activeTab === 'debug' ? debugData.code : explainData.code;
  const getCurrentResult = () => activeTab === 'debug' ? debugResult : explanation;
  const isLoading = () => activeTab === 'debug' ? debugLoading : explainLoading;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 text-left">
          <Bug className="h-8 w-8 text-purple-600" />
          Code Debugger & Explainer
        </h1>
        <p className="text-gray-600 mt-2 text-left">
          Debug your code and get detailed explanations in separate sessions
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
          <div className="glass-card hover-lift animate-fade-in-scale p-6">
            <div className="flex border-b border-gray-200 mb-4 text-left">
              <button
                className={`flex-1 py-2 font-medium text-center ${
                  activeTab === 'debug'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('debug')}
              >
                <Bug className="h-4 w-4 inline mr-2" />
                Debug Code
              </button>
              <button
                className={`flex-1 py-2 font-medium text-center ${
                  activeTab === 'explain'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('explain')}
              >
                <BookOpen className="h-4 w-4 inline mr-2" />
                Explain Code
              </button>
            </div>

            {activeTab === 'debug' ? (
              <form onSubmit={handleDebugCode} className="space-y-4">
                <div className="text-left">
                  <label htmlFor="debug-code" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Code to Debug
                  </label>
                  <textarea
                    id="debug-code"
                    name="code"
                    rows="6"
                    required
                    value={debugData.code}
                    onChange={handleDebugChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-mono text-sm text-left"
                    placeholder="Paste your code here..."
                  />
                </div>

                <div className="text-left">
                  <label htmlFor="errorMessage" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Error Message (Optional)
                  </label>
                  <textarea
                    id="errorMessage"
                    name="errorMessage"
                    rows="2"
                    value={debugData.errorMessage}
                    onChange={handleDebugChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-left"
                    placeholder="Paste any error messages you're getting..."
                  />
                </div>

                <div className="text-left">
                  <label htmlFor="debug-language" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Programming Language
                  </label>
                  <select
                    id="debug-language"
                    name="language"
                    value={debugData.language}
                    onChange={handleDebugChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-left"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className="text-left">
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={debugLoading || !debugData.code}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-left"
                >
                  <Play className="h-5 w-5" />
                  {debugLoading ? 'Debugging Code...' : 'Debug Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleExplainCode} className="space-y-4">
                <div className="text-left">
                  <label htmlFor="explain-code" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Code to Explain
                  </label>
                  <textarea
                    id="explain-code"
                    name="code"
                    rows="6"
                    required
                    value={explainData.code}
                    onChange={handleExplainChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors font-mono text-sm text-left"
                    placeholder="Paste your code here..."
                  />
                </div>

                <div className="text-left">
                  <label htmlFor="explain-language" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Programming Language
                  </label>
                  <select
                    id="explain-language"
                    name="language"
                    value={explainData.language}
                    onChange={handleExplainChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-left"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className="text-left">
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={explainLoading || !explainData.code}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-left"
                >
                  <BookOpen className="h-5 w-5" />
                  {explainLoading ? 'Explaining Code...' : 'Explain Code'}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={handleClear}
              className="w-full mt-4 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              Clear {activeTab === 'debug' ? 'Debug' : 'Explanation'} Session
            </button>
          </div>

          {/* Tips Section */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-left">
            <h3 className="font-semibold text-purple-900 mb-3 text-left">
              {activeTab === 'debug' ? '💡 Tips for Better Debugging' : '💡 Tips for Better Explanations'}
            </h3>
            {activeTab === 'debug' ? (
              <ul className="text-purple-800 text-sm space-y-2 text-left">
                <li className="text-left">• Paste the complete code that needs debugging</li>
                <li className="text-left">• Include any error messages you're receiving</li>
                <li className="text-left">• Specify the programming language correctly</li>
                <li className="text-left">• For complex issues, provide context about what the code should do</li>
              </ul>
            ) : (
              <ul className="text-purple-800 text-sm space-y-2 text-left">
                <li className="text-left">• Paste the complete code you want to understand</li>
                <li className="text-left">• Select the correct programming language</li>
                <li className="text-left">• Include comments if you have specific questions about parts</li>
                <li className="text-left">• Complex algorithms will get detailed step-by-step explanations</li>
              </ul>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4 text-left">
            <h2 className="text-xl font-semibold text-gray-900 text-left">
              {activeTab === 'debug' ? 'Debugged Code' : 'Code Explanation'}
            </h2>
            {getCurrentResult() && (
              <button
                onClick={() => handleCopy(getCurrentResult())}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {getCurrentResult() ? (
            activeTab === 'debug' ? (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-sm text-left">
                {debugResult}
              </pre>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap text-left">
                {explanation}
              </div>
            )
          ) : (
            <div className="text-gray-500 py-12 text-left">
              {activeTab === 'debug' ? (
                <>
                  <Bug className="h-12 w-12 mb-4 text-gray-300" />
                  <p className="text-left">Debugged code will appear here</p>
                  <p className="text-sm mt-2 text-left">Enter your code and click Debug Code</p>
                </>
              ) : (
                <>
                  <BookOpen className="h-12 w-12 mb-4 text-gray-300" />
                  <p className="text-left">Code explanation will appear here</p>
                  <p className="text-sm mt-2 text-left">Enter your code and click Explain Code</p>
                </>
              )}
            </div>
          )}

          {isLoading() && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Debugger;