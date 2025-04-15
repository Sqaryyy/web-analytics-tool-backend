"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "@clerk/nextjs";

interface Website {
  id: string;
  name?: string;
  url: string;
  domain?: string; // Added for API compatibility
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  isSignedIn: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  isSignedIn,
}) => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoadingWebsites, setIsLoadingWebsites] = useState(true);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const { getToken } = useAuth();

  const fetchWebsites = async () => {
    if (!isSignedIn) {
      setIsLoadingWebsites(false);
      return;
    }

    setIsLoadingWebsites(true);
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:3000/api/websites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch websites");
      }

      const data = await response.json();

      // Transform data if needed to match the Website type
      const formattedWebsites: Website[] = data.map((site: any) => ({
        id: site._id || site.id,
        url: site.domain || site.url,
        name: site.name,
      }));

      setWebsites(formattedWebsites);

      // Set initial selected website if any exist
      if (formattedWebsites.length > 0 && !selectedWebsite) {
        setSelectedWebsite(formattedWebsites[0]);
      }
    } catch (error) {
      console.error("Error fetching websites:", error);
      setWebsites([]);
    } finally {
      setIsLoadingWebsites(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      setIsLoadingWebsites(true);
      const fetchData = async () => {
        try {
          const token = await getToken();
          const response = await fetch("http://localhost:3000/api/websites", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch websites");
          }

          const data = await response.json();

          // Transform data if needed to match the Website type
          const formattedWebsites: Website[] = data.map((site: any) => ({
            id: site._id || site.id,
            url: site.domain || site.url,
            name: site.name,
          }));

          setWebsites(formattedWebsites);

          // Set initial selected website if any exist and none is selected yet
          if (formattedWebsites.length > 0 && !selectedWebsite) {
            setSelectedWebsite(formattedWebsites[0]);
          }
        } catch (error) {
          console.error("Error fetching websites:", error);
          setWebsites([]);
        } finally {
          setIsLoadingWebsites(false);
        }
      };

      fetchData();
    } else {
      setIsLoadingWebsites(false);
    }
  }, [isSignedIn, getToken]);

  const handleAddWebsite = async (websiteData: {
    url: string;
    name?: string;
  }) => {
    if (!isSignedIn) return;

    try {
      const token = await getToken();

      const response = await fetch("http://localhost:3000/api/websites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          domain: websiteData.url,
          name: websiteData.name || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add website");
      }

      const createdWebsite = await response.json();

      // Format the created website to match our Website type
      const newWebsite: Website = {
        id: createdWebsite._id || createdWebsite.id,
        url: createdWebsite.domain || createdWebsite.url,
        name: createdWebsite.name,
      };

      // Add the new website to our list
      setWebsites((prevWebsites) => [...prevWebsites, newWebsite]);

      // Make the newly added website the selected one
      setSelectedWebsite(newWebsite);

      return newWebsite;
    } catch (error) {
      console.error("Error adding website:", error);
      throw error;
    }
  };

  const handleSelectWebsite = (website: Website) => {
    setSelectedWebsite(website);
    // Additional logic if needed when a website is selected
  };

  let content;

  if (isSignedIn) {
    if (!isLoadingWebsites && websites.length === 0) {
      content = (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-gray-400">
            No websites added yet. Add your first website to monitor.
          </p>
        </div>
      );
    } else {
      content = children;
    }
  } else {
    content = (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-semibold">
          Unauthorized access. Please sign in.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header
          websites={websites}
          isLoading={isLoadingWebsites}
          selectedWebsite={selectedWebsite}
          onSelectWebsite={handleSelectWebsite}
          onAddWebsite={handleAddWebsite}
        />
        <div className="flex-1 p-6 overflow-auto">{content}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
