import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0">
        <Image
          src="/accueil.jpg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-40"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
      </div>
      
      <main className="relative z-10">
        <div className="container mx-auto px-4 h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center">
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Gestionnaire de Tâches
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto animate-fade-in-delay leading-relaxed">
              Organisez vos tâches efficacement et boostez votre productivité avec notre outil intuitif
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-2">
              <Link 
                href="/tasks" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  Voir mes tâches
                </span>
              </Link>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}