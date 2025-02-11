export default function ErrorFallback({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-glass backdrop-blur-theme rounded-theme p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-danger mb-4">Oops! Algo deu errado</h2>
        <p className="text-text mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2 px-4 bg-primary text-white rounded-theme hover:bg-opacity-90 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
} 