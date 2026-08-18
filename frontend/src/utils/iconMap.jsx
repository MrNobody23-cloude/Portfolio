import React from 'react';
import * as LucideIcons from 'lucide-react';

export function DynamicIcon({ name, className = "w-5 h-5", style = {} }) {
    const IconComponent = LucideIcons[name] || LucideIcons.FileText;
    return <IconComponent className={className} style={style} />;
}
