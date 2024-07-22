import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();
  const handleShort = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center font-bold italic">
        This URL Shortener <br /> Make Life Easy ...!
      </h2>
      <form
        onSubmit={handleShort}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="bg-purple-300 font-medium  hover:bg-purple-500 h-full text-lg">
          Shorten
        </Button>
      </form>
      <div className="my-20 ">
        <Accordion type="multiple" collapsible className="w-full md:px-11">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does the MiniURL shortener Works?
            </AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version
              of that URL. This shortened URL redirects to the original long URL
              when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your URLs, view
              analytics, and customize your short URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks
              and device types (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Landingpage;
