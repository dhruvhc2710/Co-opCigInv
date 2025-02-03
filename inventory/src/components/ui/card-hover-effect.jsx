"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "./drawer";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";
import axios from "axios";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    async function fetchQuantities() {
      try {
        console.log("2222222");
        const response = await axios.get("http://localhost:3002/get-cigarettes");
        if (response.status === 200 && response.data) {
          console.log("Fetched Data:", response.data);
          setQuantities(response.data.reduce((acc, item) => {
            acc[item.name] = item.qty;
            return acc;
          }, {}));
        } else {
          throw new Error("Received empty or invalid response");
        }
      } catch (error) {
        console.error("Error fetching quantities:", error.message);
      }
      
    }

    fetchQuantities();
  }, []);

  function onClick(adjustment, title) {
    setQuantities((prev) => ({
      ...prev,
      [title]: Math.max(0, (prev[title] || 0) + adjustment),
    }));
  }

  async function saveToDatabase(title, qty) {
    try {
      console.log("111111");
      const response = await axios.post("http://localhost:3002/update-cigarette", {
        name: title,
        qty,
      });
      
      console.log(`Successfully saved ${title} with qty: ${qty}`, response.data);
    } catch (error) {
      console.error("Error saving data:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Drawer key={idx} onOpenChange={() => setCurrentTitle(item.title)}>
          <DrawerTrigger asChild>
            <div
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card>
                <CardTitle>{item.title}</CardTitle>
              </Card>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{item.title}</DrawerTitle>
                <DrawerDescription>Adjust quantity</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(-1, item.title)}
                    disabled={(quantities[item.title] || 0) <= 0}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      {quantities[item.title] || 0}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                      Quantity
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(1, item.title)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
              <DrawerFooter>
                <Button
                  onClick={() => saveToDatabase(item.title, quantities[item.title] || 0)}
                >
                  Submit
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
};

// Card Component
export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// CardTitle Component
export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
