import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().regex(phoneRegex, "Telefone deve estar no formato (99) 99999-9999"),
  email: z.string().email("E-mail inválido"),
  company: z.string().min(2, "Nome da locadora é obrigatório"),
  location: z.string().min(2, "Cidade/Estado é obrigatório"),
  monthlyRevenue: z.string().min(1, "Selecione o faturamento mensal"),
  mainChallenge: z.string().min(1, "Selecione o principal desafio"),
  lgpdConsent: z.boolean().refine((val) => val === true, {
    message: "É necessário aceitar os termos LGPD",
  }),
});

type FormData = z.infer<typeof formSchema>;

const revenueOptions = [
  "Até R$ 10.000",
  "R$ 10.001 a R$ 30.000", 
  "R$ 30.001 a R$ 50.000",
  "R$ 50.001 a R$ 100.000",
  "Acima de R$ 100.000"
];

const challengeOptions = [
  "Poucos leads qualificados",
  "Baixa presença no Google",
  "Concorrência muito forte",
  "Dificuldade para precificar",
  "Gestão das campanhas",
  "Outros"
];

export const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular webhook para CRM
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Lead capturado - ODuo Assessoria:", data);
      
      toast({
        title: "Obrigado pelo seu interesse!",
        description: "Em breve nossa equipe entrará em contato pelo WhatsApp para agendar uma conversa estratégica.",
        duration: 6000,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card border-0 bg-card/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <div className="mb-4">
          <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
            🔥 BÔNUS EXCLUSIVO: R$ 1.000 OFF + Raio X Gratuito
          </span>
        </div>
        <CardTitle className="text-3xl font-bold text-foreground mb-2">
          Acelere sua Locadora com o Método ODuo
        </CardTitle>
        <p className="text-muted-foreground text-lg">
          Aumente em até 3x seus clientes com estratégias de marketing comprovadas
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome Completo *
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Seu nome completo"
                className="h-12"
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                WhatsApp *
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                onChange={handlePhoneChange}
                placeholder="(99) 99999-9999"
                className="h-12"
                maxLength={15}
              />
              {errors.phone && (
                <p className="text-destructive text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="seu@email.com"
                className="h-12"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Nome da Locadora *
              </Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Nome da sua locadora"
                className="h-12"
              />
              {errors.company && (
                <p className="text-destructive text-sm">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Cidade/Estado *
              </Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Ex: São Paulo, SP"
                className="h-12"
              />
              {errors.location && (
                <p className="text-destructive text-sm">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyRevenue" className="text-sm font-medium">
                Faturamento Mensal da Locadora *
              </Label>
              <Select onValueChange={(value) => setValue("monthlyRevenue", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione o faturamento" />
                </SelectTrigger>
                <SelectContent>
                  {revenueOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.monthlyRevenue && (
                <p className="text-destructive text-sm">{errors.monthlyRevenue.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainChallenge" className="text-sm font-medium">
              Principal Desafio da Locadora *
            </Label>
            <Select onValueChange={(value) => setValue("mainChallenge", value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Qual o maior desafio hoje?" />
              </SelectTrigger>
              <SelectContent>
                {challengeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.mainChallenge && (
              <p className="text-destructive text-sm">{errors.mainChallenge.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="lgpdConsent"
                onCheckedChange={(checked) => setValue("lgpdConsent", checked as boolean)}
              />
              <Label
                htmlFor="lgpdConsent"
                className="text-sm leading-relaxed cursor-pointer"
              >
                Autorizo o uso dos meus dados para contato comercial e envio de materiais educativos sobre marketing para locadoras. *
              </Label>
            </div>
            {errors.lgpdConsent && (
              <p className="text-destructive text-sm">{errors.lgpdConsent.message}</p>
            )}
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
            <p className="text-sm text-accent font-medium mb-2">
              ⭐ BÔNUS ao fechar hoje: Raio X de Conversões (valor R$ 800) + R$ 1.000 OFF
            </p>
            <p className="text-xs text-muted-foreground">
              Válido apenas até 31/08 ou enquanto durarem as 7 vagas restantes
            </p>
          </div>

          <Button
            type="submit"
            variant="success"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-semibold"
          >
            {isSubmitting ? "Enviando..." : "🚀 Quero Acelerar Minha Locadora Agora"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Ao enviar, você concorda em receber contato da ODuo Assessoria para apresentação da solução.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};