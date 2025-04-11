// File: app/components/WebsitesList.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface WebsitesListProps {
  userId: string;
}

const WebsitesList: React.FC<WebsitesListProps> = ({ userId }) => {
  const [websites, setWebsites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newWebsiteName, setNewWebsiteName] = useState<string>("");
  const [newWebsiteDomain, setNewWebsiteDomain] = useState<string>("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetchWebsites();
  }, [userId]);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/websites?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setWebsites(data);
      } else {
        console.error("Failed to fetch websites");
      }
    } catch (error) {
      console.error("Error fetching websites:", error);
    } finally {
      setLoading(false);
    }
  };

  const createWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebsiteName.trim() || !newWebsiteDomain.trim()) return;

    // Normalize domain (remove protocol and www if present)
    let domain = newWebsiteDomain.trim().toLowerCase();
    domain = domain.replace(/^https?:\/\//, "");
    domain = domain.replace(/^www\./, "");

    try {
      const response = await fetch(`${API_URL}/api/websites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newWebsiteName,
          domain,
          userId,
        }),
      });

      if (response.ok) {
        setNewWebsiteName("");
        setNewWebsiteDomain("");
        fetchWebsites();
      } else {
        console.error("Failed to create website");
      }
    } catch (error) {
      console.error("Error creating website:", error);
    }
  };

  if (loading) {
    return <div>Loading your websites...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Websites</h2>

      {websites.length === 0 ? (
        <p className="text-gray-500 mb-4">
          You don't have any websites yet. Add one below.
        </p>
      ) : (
        <div className="mb-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {websites.map((website) => (
                <tr key={website.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {website.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {website.domain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {website.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      href={`/websites/${website.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Analytics
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Add a new website</h3>
        <form onSubmit={createWebsite} className="space-y-4">
          <div>
            <label
              htmlFor="website-name"
              className="block text-sm font-medium text-gray-700"
            >
              Website Name
            </label>
            <input
              id="website-name"
              type="text"
              value={newWebsiteName}
              onChange={(e) => setNewWebsiteName(e.target.value)}
              placeholder="My Website"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="website-domain"
              className="block text-sm font-medium text-gray-700"
            >
              Website Domain
            </label>
            <input
              id="website-domain"
              type="text"
              value={newWebsiteDomain}
              onChange={(e) => setNewWebsiteDomain(e.target.value)}
              placeholder="example.com"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Website
          </button>
        </form>
      </div>

      {websites.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium mb-2">
            Installation Instructions
          </h3>
          <p className="mb-2">
            Add this script to the{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">
              &lt;head&gt;
            </code>{" "}
            of your HTML:
          </p>

          <div className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
            <pre>{`<script src="${API_URL}/peasy.js" data-website-id="${websites[0].id}" async></script>`}</pre>
          </div>

          <h4 className="text-md font-medium mt-4 mb-2">Track Custom Events</h4>
          <p className="mb-2">You can track custom events with:</p>
          <div className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
            <pre>{`// Track a simple event
peasy.trackEvent('button_click');

// Track with additional data
peasy.trackEvent('purchase', { productId: '123', amount: 49.99 });`}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitesList;
