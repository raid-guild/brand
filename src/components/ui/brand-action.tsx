"use client";
import * as React from "react";

type Direction = "right" | "left" | "down" | "down-right" | "up-right";
type Common = {children: React.ReactNode; variant?: "primary" | "secondary"; direction?: Direction; className?: string; disabled?: boolean};
type LinkAction = Common & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>,"children"|"href"|"className"> & {href:string};
type ButtonAction = Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,"children"|"className"> & {href?:never};
export type BrandActionProps = LinkAction | ButtonAction;
const angle: Record<Direction,number>={right:180,left:0,down:90,"down-right":135,"up-right":225};
function Sword({direction}:{direction:Direction}) {return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="28" height="28" fill="none"><g transform={`rotate(${angle[direction]} 12 12)`}><path d="M22 11.8033L19.7358 10.6507H6.38875S6.5 9.5 7.44769 7.96791L6.5 7C5.52067 8.11518 5 10 5.05734 11H1V11.8033H22Z" fill="currentColor"/><path d="M21.9969 11.8015L19.7358 12.9541H6.38874S6.5 14.1048 7.44769 15.6369L6.5 16.6048C5.52067 15.4896 5 13.6048 5.05734 12.6048H1V11.8015H21.9969Z" fill="currentColor"/></g></svg>}
export function BrandAction(props: BrandActionProps){
 const {children,variant="primary",direction="right",className="",disabled=false}=props;
 const content=<><span className="rg-brand-action__label">{children}</span><span className="rg-brand-action__disc"><Sword direction={direction}/></span></>;
 const classes=["rg-brand-action",className].filter(Boolean).join(" ");
 if("href" in props && props.href!==undefined){const {href,children:_,variant:__,direction:___,className:____,disabled:_____,onClick,...rest}=props;
 return <a {...rest} className={classes} data-variant={variant} data-direction={direction} href={disabled?undefined:href} aria-disabled={disabled||undefined} tabIndex={disabled?-1:rest.tabIndex} onClick={event=>{if(disabled)event.preventDefault();else onClick?.(event)}}>{content}</a>}
 const {children:_,variant:__,direction:___,className:____,disabled:_____,type="button",...rest}=props as ButtonAction;
 return <button {...rest} type={type} className={classes} data-variant={variant} data-direction={direction} disabled={disabled}>{content}</button>;
}
export function BrandButton(props: ButtonAction){return <BrandAction {...props}/>}
