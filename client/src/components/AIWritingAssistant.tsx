import React from 'react';
import { FaPenFancy, FaCheck, FaLightbulb } from 'react-icons/fa';

const AIWritingAssistant: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">AI Writing Assistant</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                <FaPenFancy className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Intelligent Writing Support</h3>
              <p className="text-muted-foreground text-lg">
                Enhance your writing with AI-powered suggestions for grammar, style, and clarity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Grammar & Spelling</h4>
                    <p className="text-sm text-muted-foreground">Real-time correction and suggestions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Style Enhancement</h4>
                    <p className="text-sm text-muted-foreground">Improve tone and readability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Content Generation</h4>
                    <p className="text-sm text-muted-foreground">AI-powered content ideas and templates</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/50 p-6 rounded-xl shadow-inner">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Writing Sample</h4>
                <div className="bg-white/70 p-4 rounded-lg">
                  <p className="text-foreground">
                    The productivity platform offers comprehensive tools for modern teams.
                    <span className="bg-yellow-200 px-1 rounded">This sentence could be more engaging.</span>
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-2">
                    <FaLightbulb className="text-blue-500 mt-1" />
                    <div>
                      <h5 className="font-medium text-blue-900">AI Suggestion</h5>
                      <p className="text-sm text-blue-800">
                        Consider: "Our productivity platform empowers modern teams with comprehensive, cutting-edge tools."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWritingAssistant;
