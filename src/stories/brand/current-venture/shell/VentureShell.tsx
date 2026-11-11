"use client";
import { createContext, useContext, useState, type ReactNode, type MouseEvent } from "react";
type SnapshotContext = {portalOpen:boolean;arrivalTarget:null;inquiryExpanded:boolean;setInquiryExpanded:(expanded:boolean)=>void;sectionHref:(section:string)=>string;followSectionLink:(event:MouseEvent<HTMLAnchorElement>,section:string)=>void;followInquiryLink:(event:MouseEvent<HTMLAnchorElement>)=>void;openPortal:()=>void};
const Context=createContext<SnapshotContext|null>(null);
export function SnapshotShell({children,onReport}:{children:ReactNode;onReport:(message:string)=>void}){
 const [inquiryExpanded,setInquiryExpanded]=useState(false);
 const state={portalOpen:false,arrivalTarget:null,inquiryExpanded,setInquiryExpanded,sectionHref:(section:string)=>`#${section}`,followSectionLink:(event:MouseEvent<HTMLAnchorElement>,section:string)=>{event.preventDefault();onReport(`Section: ${section}`);document.getElementById(section)?.scrollIntoView({block:"start"})},followInquiryLink:(event:MouseEvent<HTMLAnchorElement>)=>{event.preventDefault();onReport("Inquiry preview");document.getElementById("project-inquiry")?.scrollIntoView({block:"start"})},openPortal:()=>onReport("Open the Portal")};
 return <Context.Provider value={state}>{children}</Context.Provider>;
}
export function useVenture(){const value=useContext(Context);if(!value)throw new Error("SnapshotShell is required");return value;}
