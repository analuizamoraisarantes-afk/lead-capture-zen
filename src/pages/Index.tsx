import { LeadForm } from "@/components/LeadForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <header className="relative py-16 px-4 text-center bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          {/* Urgência */}
          <div className="mb-6">
            <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              🔥 ÚLTIMA CHANCE DO MÊS — SÓ ATÉ 31/08
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Acelere sua{" "}
            <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
              locadora
            </span>
            <br />
            com o método ODuo
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
            Aumente em até <strong>3x a quantidade de clientes</strong> da sua locadora{" "}
            <span className="text-accent font-semibold">com estratégias de marketing</span>{" "}
            que já colocaram mais de 150 empresas no topo das buscas e lotaram estoques de equipamentos.
          </p>

          <div className="bg-primary-glow/20 border border-accent/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-accent font-bold mb-2">🎯 BÔNUS EXCLUSIVO: Fechou hoje?</p>
            <p className="text-lg">
              Ganha até <strong className="text-accent">R$1.000 OFF</strong> + nosso{" "}
              <strong>Raio X de Conversões</strong> gratuito (valor R$ 800)
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm mb-2 opacity-75">⏰ Contador regressivo:</p>
              <div className="flex gap-4 text-center">
                {[
                  { label: "Dias", value: "06" },
                  { label: "Hrs", value: "04" },
                  { label: "Min", value: "20" },
                  { label: "Seg", value: "32" }
                ].map((time) => (
                  <div key={time.label}>
                    <div className="text-2xl font-bold text-accent">{time.value}</div>
                    <div className="text-xs opacity-75">{time.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm opacity-75">
            🚨 Só até 31/08 ou enquanto durar as 7 vagas restantes
          </p>
        </div>
      </header>

      {/* Por que escolher */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher a{" "}
              <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                ODuo
              </span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Restam apenas <span className="text-accent font-bold">7 vagas</span> para os planos de aceleração deste mês
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "↑",
                title: "Mais Demanda",
                description: "Faturamento previsível com leads qualificados que viram contratos reais.",
                color: "text-success"
              },
              {
                icon: "◎",
                title: "Autoridade Digital", 
                description: "Dominância no Google e redes sociais na sua região.",
                color: "text-primary"
              },
              {
                icon: "📊",
                title: "Gestão Completa",
                description: "Google Ads, Meta Ads, SEO e automações integradas.",
                color: "text-accent"
              }
            ].map((benefit) => (
              <div 
                key={benefit.title}
                className="text-center p-8 rounded-xl bg-card border border-border shadow-card hover:shadow-lg transition-all duration-300"
              >
                <div className={`text-5xl mb-6 ${benefit.color} font-bold`}>{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Como funciona
          </h2>
          
          <div className="space-y-6">
            {[
              "✅ Raio-X inicial: diagnóstico do funil e canais.",
              "✅ Setup: campanhas Google/Meta + SEO local + páginas.",
              "✅ Rotina quinzenal: otimizações, relatórios e alinhamentos.",
              "✅ Automação comercial: SLAs, follow-up e métricas."
            ].map((step, index) => (
              <div 
                key={index}
                className="flex items-center p-4 bg-card rounded-lg border border-border shadow-sm"
              >
                <span className="text-lg font-medium">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="bg-accent text-accent-foreground px-6 py-3 rounded-lg text-lg font-bold">
              🚨 ÚLTIMAS 7 VAGAS DO MÊS
            </span>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <main className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
                R$ 1.000 OFF
              </span>{" "}
              + Raio X gratuito
            </h2>
            <p className="text-lg text-muted-foreground">
              Válido só até <strong className="text-accent">31/08</strong> ou enquanto durar as vagas.
            </p>
          </div>
          
          <LeadForm />
        </div>
      </main>

      {/* O que está incluso */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que está incluso
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "✅ Google Ads + Meta Ads otimizados",
              "✅ SEO local + Google Meu Negócio",
              "✅ Landing pages otimizadas", 
              "✅ Automações de vendas",
              "✅ Relatórios de conversão em tempo real",
              "✅ Suporte especializado em locadoras"
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center p-4 bg-primary-glow/20 rounded-lg backdrop-blur-sm"
              >
                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-block bg-accent/20 border border-accent/30 rounded-lg p-4">
              <span className="text-accent text-xl font-bold">
                ⭐ BÔNUS: Raio X de Conversões (R$ 800)
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;