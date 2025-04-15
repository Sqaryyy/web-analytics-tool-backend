"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Framework data with icons, names, and basic integration code
const frameworks = [
  {
    id: "next",
    name: "Next.js",
    icon: "/icons/nextjs.svg", // You'll need to add these icons to your public folder
    description: "Server-side rendering React framework",
    installCommand: "npm install @your-analytics/next",
    setupCode: `// pages/_app.js or app/layout.js
import { Analytics } from '@your-analytics/next'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics siteId="YOUR_SITE_ID" />
    </>
  )
}`,
  },
  {
    id: "react",
    name: "React",
    icon: "/icons/react.svg",
    description: "JavaScript library for building user interfaces",
    installCommand: "npm install @your-analytics/react",
    setupCode: `// src/App.jsx
import { Analytics } from '@your-analytics/react'

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      <Analytics siteId="YOUR_SITE_ID" />
    </div>
  )
}`,
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: "/icons/vue.svg",
    description: "Progressive JavaScript framework",
    installCommand: "npm install @your-analytics/vue",
    setupCode: `// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { analytics } from '@your-analytics/vue'

const app = createApp(App)
app.use(analytics, {
  siteId: 'YOUR_SITE_ID'
})
app.mount('#app')`,
  },
  {
    id: "angular",
    name: "Angular",
    icon: "/icons/angular.svg",
    description: "Platform for building mobile and desktop web applications",
    installCommand: "npm install @your-analytics/angular",
    setupCode: `// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnalyticsModule } from '@your-analytics/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AnalyticsModule.forRoot({
      siteId: 'YOUR_SITE_ID'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }`,
  },
  {
    id: "svelte",
    name: "Svelte",
    icon: "/icons/svelte.svg",
    description: "Cybernetically enhanced web apps",
    installCommand: "npm install @your-analytics/svelte",
    setupCode: `<!-- App.svelte -->
<script>
  import { Analytics } from '@your-analytics/svelte';
</script>

<main>
  <!-- Your app content -->
</main>

<Analytics siteId="YOUR_SITE_ID" />`,
  },
  {
    id: "html",
    name: "HTML",
    icon: "/icons/html.svg",
    description: "Standard markup language for web pages",
    installCommand: null,
    setupCode: `<!-- Add this script before the closing </body> tag -->
<script>
  (function(a,n,l,y,t,i,c,s){
    a[y]=a[y]||function(){(a[y].q=a[y].q||[]).push(arguments)};
    t=n.createElement(l);i=n.getElementsByTagName(l)[0];
    t.async=1;t.src="https://cdn.youranalytics.com/tracker.js";
    i.parentNode.insertBefore(t,i)
  })(window,document,"script","ya");
  ya("init", "YOUR_SITE_ID");
</script>`,
  },
  {
    id: "gatsby",
    name: "Gatsby",
    icon: "/icons/gatsby.svg",
    description: "Static site generator for React",
    installCommand: "npm install @your-analytics/gatsby",
    setupCode: `// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: '@your-analytics/gatsby',
      options: {
        siteId: 'YOUR_SITE_ID'
      }
    }
  ]
}`,
  },
  {
    id: "nuxt",
    name: "Nuxt.js",
    icon: "/icons/nuxt.svg",
    description: "Vue.js framework for server-side rendering",
    installCommand: "npm install @your-analytics/nuxt",
    setupCode: `// nuxt.config.js
export default {
  modules: [
    '@your-analytics/nuxt'
  ],
  yourAnalytics: {
    siteId: 'YOUR_SITE_ID'
  }
}`,
  },
];

const IntegrationPage = () => {
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Integration Guide</h1>
          <p className="text-gray-400 mt-2">
            Select your framework and follow the integration steps to start
            tracking analytics on your website.
          </p>
        </div>

        {/* Framework Selection Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Select Your Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {frameworks.map((framework) => (
              <div
                key={framework.id}
                className={`cursor-pointer transition-all duration-200 p-4 rounded-lg flex flex-col items-center justify-center 
                  ${
                    selectedFramework.id === framework.id
                      ? "bg-[#1DCD9F]/20 border-2 border-[#1DCD9F]"
                      : "bg-gray-800/50 border border-gray-700 hover:border-gray-500"
                  }`}
                onClick={() => setSelectedFramework(framework)}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 relative">
                  {/* This would be the actual framework icon in production */}
                  <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center">
                    {framework.name.charAt(0)}
                  </div>
                  {selectedFramework.id === framework.id && (
                    <div className="absolute -top-2 -right-2 bg-[#1DCD9F] rounded-full p-0.5">
                      <Check className="h-3 w-3 text-black" />
                    </div>
                  )}
                </div>
                <span className="text-sm text-center">{framework.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Instructions */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle>{selectedFramework.name} Integration</CardTitle>
            <CardDescription>{selectedFramework.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="automatic" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="automatic">
                  Automatic Installation
                </TabsTrigger>
                <TabsTrigger value="manual">Manual Setup</TabsTrigger>
              </TabsList>

              <TabsContent value="automatic" className="space-y-6">
                {selectedFramework.installCommand ? (
                  <>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Step 1: Install Package
                      </h3>
                      <div className="bg-black border border-gray-700 rounded-md p-4 relative font-mono text-sm">
                        {selectedFramework.installCommand}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() =>
                            copyToClipboard(
                              selectedFramework.installCommand!,
                              "install"
                            )
                          }
                        >
                          {copied === "install" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Step 2: Add to Your Project
                      </h3>
                      <div className="bg-black border border-gray-700 rounded-md p-4 relative font-mono text-sm">
                        <pre>{selectedFramework.setupCode}</pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() =>
                            copyToClipboard(
                              selectedFramework.setupCode,
                              "setup"
                            )
                          }
                        >
                          {copied === "setup" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Add Script to Your HTML
                    </h3>
                    <div className="bg-black border border-gray-700 rounded-md p-4 relative font-mono text-sm">
                      <pre>{selectedFramework.setupCode}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() =>
                          copyToClipboard(selectedFramework.setupCode, "setup")
                        }
                      >
                        {copied === "setup" ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <Alert className="bg-blue-900/20 border border-blue-500/50">
                  <AlertDescription className="text-blue-300">
                    Make sure to replace{" "}
                    <code className="bg-black/30 px-1 py-0.5 rounded">
                      YOUR_SITE_ID
                    </code>{" "}
                    with your actual site ID from the dashboard.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="manual" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Manual Script Integration
                  </h3>
                  <p className="text-gray-400 mb-4">
                    You can also manually add our analytics script to your{" "}
                    {selectedFramework.name} project:
                  </p>
                  <div className="bg-black border border-gray-700 rounded-md p-4 relative font-mono text-sm">
                    <pre>{`<script>
  (function(a,n,l,y,t,i,c,s){
    a[y]=a[y]||function(){(a[y].q=a[y].q||[]).push(arguments)};
    t=n.createElement(l);i=n.getElementsByTagName(l)[0];
    t.async=1;t.src="https://cdn.youranalytics.com/tracker.js";
    i.parentNode.insertBefore(t,i)
  })(window,document,"script","ya");
  ya("init", "YOUR_SITE_ID");
</script>`}</pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() =>
                        copyToClipboard(
                          `<script>
  (function(a,n,l,y,t,i,c,s){
    a[y]=a[y]||function(){(a[y].q=a[y].q||[]).push(arguments)};
    t=n.createElement(l);i=n.getElementsByTagName(l)[0];
    t.async=1;t.src="https://cdn.youranalytics.com/tracker.js";
    i.parentNode.insertBefore(t,i)
  })(window,document,"script","ya");
  ya("init", "YOUR_SITE_ID");
</script>`,
                          "manual"
                        )
                      }
                    >
                      {copied === "manual" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Alert className="bg-blue-900/20 border border-blue-500/50">
                  <AlertDescription className="text-blue-300">
                    For {selectedFramework.name} applications, add this script
                    before the closing{" "}
                    <code className="bg-black/30 px-1 py-0.5 rounded">
                      &lt;/body&gt;
                    </code>{" "}
                    tag.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <h3 className="font-medium">Next Steps</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>
                After integration, analytics data will begin flowing within 5
                minutes
              </li>
              <li>
                Verify installation with the validation tool in your dashboard
              </li>
              <li>Set up custom events to track specific user interactions</li>
            </ul>
            <div className="flex space-x-4 pt-4 w-full">
              <Button className="bg-[#1DCD9F] text-black hover:bg-[#1DCD9F]/90">
                Verify Installation
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-white hover:bg-gray-800"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Documentation Link */}
        <div className="mt-8 text-center">
          <Link
            href="/docs"
            className="text-[#1DCD9F] hover:underline flex items-center justify-center"
          >
            View full documentation
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;
