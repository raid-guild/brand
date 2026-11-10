import { Fragment, type ReactNode } from "react";
import type { Copy } from "../narrative/types";
function rich(text:string){return text.split(/(\*\*[^*]+\*\*|\s+(?=\*\*))/g).filter(Boolean).map((part,index)=>part.startsWith("**")&&part.endsWith("**")?<strong key={index}>{part.slice(2,-2)}</strong>:<Fragment key={index}>{part}</Fragment>)}
export function CopyText({copy,before="",after=""}:{copy:Copy;before?:string;after?:string}) { return <>{rich(before+copy.text+after)}</>; }
export function ReviewFlag({children}:{children:ReactNode;id?:string;reason?:string;note?:string;block?:boolean}) { return <>{children}</>; }
export function useReviewFlags(){return false;}
