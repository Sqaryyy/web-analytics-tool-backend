"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";

// Shadcn Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Website = {
  id: string;
  url: string;
  name?: string;
  publicId?: string;
};

interface HeaderProps {
  websites: Website[];
  isLoading: boolean;
  selectedWebsite: Website | null;
  onSelectWebsite: (website: Website) => void;
  onAddWebsite: (websiteData: {
    url: string;
    name?: string;
  }) => Promise<Website | void>;
}

export default function Header({
  websites,
  isLoading,
  selectedWebsite,
  onSelectWebsite,
  onAddWebsite,
}: HeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");
  const [newWebsiteName, setNewWebsiteName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addedWebsite, setAddedWebsite] = useState<Website | null>(null);

  const handleAddWebsite = () => {
    setShowModal(true);
    setAddSuccess(false);
  };

  const handleAddWebsiteSubmit = async () => {
    const trimmedUrl = newWebsiteUrl.trim();
    const trimmedName = newWebsiteName.trim();

    if (!trimmedUrl) return;

    try {
      setIsSubmitting(true);
      const result = await onAddWebsite({
        url: trimmedUrl,
        name: trimmedName || undefined,
      });

      // Set success state and store the added website
      if (result) {
        setAddedWebsite(result as Website);
        setAddSuccess(true);
      }

      // Don't reset form or close modal
    } catch (error) {
      console.error("Error adding website:", error);
      // Optional: display a toast or error UI
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToIntegration = () => {
    router.push("/integration");
    setShowModal(false);

    // Reset form state after navigation
    setNewWebsiteUrl("");
    setNewWebsiteName("");
    setAddSuccess(false);
    setAddedWebsite(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Skeleton Component
  const WebsiteButtonSkeleton = () => (
    <Skeleton className="h-10 w-40 rounded-md bg-gray-700" />
  );

  // Display name for selected website
  const getDisplayName = (website: Website | null) => {
    if (!website) return "Select Website";
    return website.name || website.url;
  };

  return (
    <header className="h-16 border-b border-gray-800 bg-black px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton>
            <Button
              variant="outline"
              className="text-white bg-transparent border border-gray-700 hover:bg-gray-800"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="bg-[#1DCD9F] text-black hover:bg-[#1DCD9F]/90">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="h-8 w-px bg-gray-700"></div>

        {/* Website Selection & Public ID */}
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <WebsiteButtonSkeleton />
          ) : websites.length > 0 ? (
            <>
              {/* Website Dropdown */}
              <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-white bg-black border border-gray-700 px-4 py-2 rounded-md hover:border-[#1DCD9F] hover:bg-[#1DCD9F]/10 hover:text-white transition-colors duration-200 ease-in-out"
                  >
                    {getDisplayName(selectedWebsite)}
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4 text-[#1DCD9F]" />
                    </motion.div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-[#0D0D0D] border border-gray-700 text-white shadow-lg">
                  {websites.map((website) => (
                    <DropdownMenuItem
                      key={website.id}
                      onSelect={() => onSelectWebsite(website)}
                      className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-[#1DCD9F]/20 hover:text-white focus:bg-[#1DCD9F]/30 focus:text-[#1DCD9F]"
                    >
                      {website.name || website.url}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    onClick={handleAddWebsite}
                    className="cursor-pointer px-4 py-2 text-sm text-white hover:bg-[#1DCD9F]/20 hover:text-white focus:bg-[#1DCD9F]/30 focus:text-[#1DCD9F]"
                  >
                    + Add Website
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Show Public ID when website is selected */}
              {selectedWebsite && selectedWebsite.publicId && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex items-center space-x-1 bg-gray-800 px-3 py-1 rounded text-sm cursor-pointer border border-gray-700"
                        onClick={() =>
                          copyToClipboard(selectedWebsite.publicId || "")
                        }
                      >
                        <span className="text-gray-400">ID: </span>
                        <span className="text-white font-mono">
                          {selectedWebsite.publicId}
                        </span>
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to copy ID</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          ) : (
            // Show Add button if not loading and no websites exist
            <Button
              variant="outline"
              className="px-4 py-2 rounded-md text-white bg-black border border-gray-700 hover:border-[#1DCD9F] hover:bg-[#1DCD9F]/10 hover:text-white transition-colors duration-200 ease-in-out"
              onClick={handleAddWebsite}
            >
              + Add Website
            </Button>
          )}
        </div>

        <div className="h-2 w-2 rounded-full bg-green-500"></div>
      </div>

      {/* Add Website Modal */}
      <Dialog
        open={showModal}
        onOpenChange={(open) => {
          if (!open) {
            // Reset states when closing dialog without completing flow
            setAddSuccess(false);
            setNewWebsiteUrl("");
            setNewWebsiteName("");
            setAddedWebsite(null);
          }
          setShowModal(open);
        }}
      >
        <DialogContent className="bg-[#0D0D0D] border border-gray-700 text-white sm:max-w-md">
          {!addSuccess ? (
            /* Website Details Form */
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">
                  Add Website
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the details of the website you want to add
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="url" className="text-white">
                    Website URL
                  </Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={newWebsiteUrl}
                    onChange={(e) => setNewWebsiteUrl(e.target.value)}
                    className="bg-black border-gray-700 text-white focus:border-[#1DCD9F] focus:ring-[#1DCD9F]/10"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-white">
                    Website Name (Optional)
                  </Label>
                  <Input
                    id="name"
                    placeholder="My Website"
                    value={newWebsiteName}
                    onChange={(e) => setNewWebsiteName(e.target.value)}
                    className="bg-black border-gray-700 text-white focus:border-[#1DCD9F] focus:ring-[#1DCD9F]/10"
                  />
                </div>
              </div>

              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-white bg-transparent border border-gray-700 hover:bg-gray-800"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  onClick={handleAddWebsiteSubmit}
                  className="bg-[#1DCD9F] text-black hover:bg-[#1DCD9F]/90"
                  disabled={!newWebsiteUrl.trim() || isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Website"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            /* Success and Integration Steps View */
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-white">
                  Website Added Successfully
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Your website has been added to your dashboard
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <Alert className="bg-green-900/20 border border-green-500/50 mb-6">
                  <AlertTitle className="text-green-400">Success!</AlertTitle>
                  <AlertDescription className="text-green-300">
                    Website {addedWebsite?.name || addedWebsite?.url} has been
                    successfully added.
                  </AlertDescription>
                </Alert>

                <div className="text-white mb-6">
                  <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                  <p className="text-gray-300 mb-4">
                    Follow the integration steps to start tracking analytics for
                    your page.
                  </p>
                </div>
              </div>

              <DialogFooter className="sm:justify-end">
                <Button
                  type="button"
                  onClick={navigateToIntegration}
                  className="bg-[#1DCD9F] text-black hover:bg-[#1DCD9F]/90 w-full sm:w-auto"
                >
                  Continue to Integration
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}
