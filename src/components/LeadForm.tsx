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
  company: z.string().min(2, "Nome da empresa é obrigatório"),
  location: z.string().min(2, "Cidade/Estado é obrigatório"),
  equipment: z.string().min(1, "Selecione um equipamento"),
  lgpdConsent: z.boolean().refine((val) => val === true, {
    message: "É necessário aceitar os termos LGPD",
  }),
});

type FormData = z.infer<typeof formSchema>;

const equipmentOptions = [
  "Andaime",
  "Escora Metálica",
  "Betoneira",
  "Compactador",
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
      
      console.log("Dados enviados para CRM:", data);
      
      toast({
        title: "Obrigado!",
        description: "Em breve nossa equipe entrará em contato pelo WhatsApp.",
        duration: 5000,
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
    <Card className="w-full max-w-2xl mx-auto shadow-card border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Solicite sua Proposta
        </CardTitle>
        <p className="text-muted-foreground text-lg">
          Preencha os dados e receba uma cotação personalizada
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
                Empresa *
              </Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Nome da sua empresa"
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
                placeholder="Cidade, Estado"
                className="h-12"
              />
              {errors.location && (
                <p className="text-destructive text-sm">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment" className="text-sm font-medium">
                Equipamento de Interesse *
              </Label>
              <Select onValueChange={(value) => setValue("equipment", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione o equipamento" />
                </SelectTrigger>
                <SelectContent>
                  {equipmentOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.equipment && (
                <p className="text-destructive text-sm">{errors.equipment.message}</p>
              )}
            </div>
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
                Autorizo o uso dos meus dados para contato comercial. *
              </Label>
            </div>
            {errors.lgpdConsent && (
              <p className="text-destructive text-sm">{errors.lgpdConsent.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="success"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-semibold"
          >
            {isSubmitting ? "Enviando..." : "Quero receber uma proposta agora"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};