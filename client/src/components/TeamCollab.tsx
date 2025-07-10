import React from 'react';
import { FaUsers, FaComments, FaShare } from 'react-icons/fa';

const TeamCollab: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Team Collaboration</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Team Workspaces</h3>
              <p className="text-muted-foreground">Create shared spaces for your team to collaborate on projects and tasks.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaComments className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Real-time Chat</h3>
              <p className="text-muted-foreground">Communicate instantly with your team members through integrated messaging.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaShare className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">File Sharing</h3>
              <p className="text-muted-foreground">Share documents, images, and files seamlessly across your team.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCollab;
