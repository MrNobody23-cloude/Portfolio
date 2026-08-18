import React from 'react';
import { useOS } from '../../context/OSContext';
import WindowFrame from './WindowFrame';

import AboutApp from '../apps/AboutApp';
import ProjectsApp from '../apps/ProjectsApp';
import SkillsApp from '../apps/SkillsApp';
import ExperienceApp from '../apps/ExperienceApp';
import EducationApp from '../apps/EducationApp';
import AchievementsApp from '../apps/AchievementsApp';
import ResumeApp from '../apps/ResumeApp';
import ContactApp from '../apps/ContactApp';
import TerminalApp from '../apps/TerminalApp';
import ExplorerApp from '../apps/ExplorerApp';
import SettingsApp from '../apps/SettingsApp';
import SystemStatusApp from '../apps/SystemStatusApp';
import NotFoundApp from '../apps/NotFoundApp';

export default function WindowManager() {
    const { windows } = useOS();

    const renderAppContent = (win) => {
        switch (win.appId) {
            case 'about':
                return <AboutApp windowParams={win.params} />;
            case 'projects':
                return <ProjectsApp windowParams={win.params} />;
            case 'skills':
                return <SkillsApp windowParams={win.params} />;
            case 'experience':
                return <ExperienceApp windowParams={win.params} />;
            case 'education':
                return <EducationApp windowParams={win.params} />;
            case 'achievements':
                return <AchievementsApp windowParams={win.params} />;
            case 'resume':
                return <ResumeApp windowParams={win.params} />;
            case 'contact':
                return <ContactApp windowParams={win.params} />;
            case 'terminal':
                return <TerminalApp windowParams={win.params} />;
            case 'explorer':
                return <ExplorerApp windowParams={win.params} />;
            case 'settings':
                return <SettingsApp windowParams={win.params} />;
            case 'system-status':
                return <SystemStatusApp windowParams={win.params} />;
            default:
                return <NotFoundApp windowParams={win.params} />;
        }
    };

    return (
        <>
            {windows.map((win) => (
                <WindowFrame key={win.id} window={win}>
                    {renderAppContent(win)}
                </WindowFrame>
            ))}
        </>
    );
}
