import { LeadForm } from "@/components/LeadForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <header className="relative py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Equipamentos
            </span>{" "}
            <span className="text-foreground">de</span>{" "}
            <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
              Construção
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Soluções completas em equipamentos para construção civil. 
            Qualidade, segurança e tecnologia para seus projetos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {["Andaimes", "Escoras Metálicas", "Betoneiras", "Compactadores"].map((item, index) => (
              <span 
                key={item}
                className="px-6 py-2 bg-card/60 backdrop-blur-sm border border-border rounded-full text-sm font-medium text-foreground shadow-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Form Section */}
      <main className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <LeadForm />
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Por que escolher nossos equipamentos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualidade Garantida",
                description: "Equipamentos certificados e testados para máxima segurança",
                icon: "🏗️"
              },
              {
                title: "Entrega Rápida",
                description: "Logística otimizada para atender seus prazos",
                icon: "🚚"
              },
              {
                title: "Suporte 24/7",
                description: "Equipe técnica disponível para suporte completo",
                icon: "🛠️"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-6 rounded-lg bg-card/60 backdrop-blur-sm border border-border shadow-sm hover:shadow-card transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
