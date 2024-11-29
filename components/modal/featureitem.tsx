import Image from "next/image";
import React from "react";

interface FeatureItemProps {
    icon: string;
    title: string;
    description: string;
}

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
    return (
        <li className="flex items-start space-x-3">
            <Image src={icon} alt={title} width={32} height={32} />
            <div>
                <h3 className="font-medium text-gray-800">{title}</h3>
                <p className="text-[14px] text-[#4F5E71]">{description}</p>
            </div>
        </li>
    );
}
