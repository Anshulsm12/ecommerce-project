const ErrorDisplay = ({ message, onRetry }) => {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          <svg 
            className="w-12 h-12 mx-auto mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p className="text-lg font-semibold">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  };
  
  export default ErrorDisplay;