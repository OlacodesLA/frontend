"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronRight, FileText, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hi, how can we be of help?</CardTitle>
          <CardDescription>
            Looking for answers? Find them here!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search for articles..."
            className="w-full bg-[#697D951A]"
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-1">
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            footer={card.footer}
            showChevron={card.showChevron}
            buttonLabel={card.buttonLabel}
          />
        ))}
      </div>
    </div>
  );
}

interface CardComponentProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  footer?: string;
  showChevron?: boolean;
  buttonLabel?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  icon,
  footer,
  showChevron,
  buttonLabel,
}) => {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        {footer && (
          <div className="text-sm text-muted-foreground">{footer}</div>
        )}
        {showChevron && <ChevronRight className="h-5 w-5" />}
        {buttonLabel && (
          <Button className="w-full sm:w-auto">{buttonLabel}</Button>
        )}
      </CardContent>
    </Card>
  );
};

const cardData = [
  {
    title: "FAQs",
    description: "Frequently asked questions that might help!",
    icon: <BookOpen className="h-5 w-5" />,
    footer: "By UZEL • 6 articles",
    showChevron: true,
  },
  {
    title: "Terms & Conditions",
    description: "UZEL Terms and Condition",
    icon: <FileText className="h-5 w-5" />,
    footer: "By UZEL",
    showChevron: true,
  },
  {
    title: "Private Policy",
    description: "UZEL Private Policy",
    icon: <FileText className="h-5 w-5" />,
    footer: "By UZEL",
    showChevron: true,
  },
  {
    title: "Customer Support",
    description:
      "Do you encounter any challenges while using the platform? Do you have any suggestions for improvement? Feel free to reach out to our customer service team.",
    icon: <MessageSquare className="h-5 w-5" />,
    buttonLabel: "Message Now",
  },
];
