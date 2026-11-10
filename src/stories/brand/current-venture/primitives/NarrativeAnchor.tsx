"use client";
import type { ReactNode, MouseEvent } from "react";
import type { NarrativeLink } from "../narrative/types";
import { useVenture } from "../shell/VentureShell";
export default function NarrativeAnchor({link,className,children}:{link:NarrativeLink;className?:string;children:ReactNode}){
 const {sectionHref,followSectionLink,followInquiryLink}=useVenture();
 const section=link.section;const href=section?sectionHref(section):link.href;
 const click=(event:MouseEvent<HTMLAnchorElement>)=>{if(section==="project-inquiry")followInquiryLink(event);else if(section)followSectionLink(event,section);else event.preventDefault();};
 return <a className={className} href={href} onClick={click}>{children}</a>;
}
