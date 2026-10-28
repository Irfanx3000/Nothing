import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById } from "./server-CnGYgseA.js";
import { i as timelineOptions, n as contactSchema, r as serviceOptions, t as budgetOptions } from "./validation-BwYvtDrt.js";
import { n as siteConfig } from "./router-DlGnJ02Y.js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUpRight, CheckCircle2, Loader2, Mail, Menu, MessageCircle, X } from "lucide-react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// src/config/navigation.ts
var navLinks = [
	{
		label: "Home",
		href: "#home"
	},
	{
		label: "Work",
		href: "#work"
	},
	{
		label: "Services",
		href: "#services"
	},
	{
		label: "About",
		href: "#about"
	},
	{
		label: "Contact",
		href: "#contact"
	}
];
// src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
// src/components/ui/ActionButton.tsx
var buttonStyles = cva("group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none", {
	variants: {
		variant: {
			solid: "bg-page-fg text-page hover:bg-clay hover:text-charcoal",
			outline: "border border-page-line text-page-fg hover:border-page-fg",
			accent: "bg-clay text-charcoal hover:bg-page-fg hover:text-page"
		},
		size: {
			sm: "h-10 px-5 text-sm",
			md: "h-12 px-6 text-sm",
			lg: "h-14 px-8 text-base"
		}
	},
	defaultVariants: {
		variant: "solid",
		size: "md"
	}
});
function ButtonLink({ className, variant, size, children, ...props }) {
	return /* @__PURE__ */ jsx("a", {
		className: cn(buttonStyles({
			variant,
			size
		}), className),
		...props,
		children
	});
}
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ jsx("button", {
		className: cn(buttonStyles({
			variant,
			size
		}), className),
		...props
	});
}
// src/components/layout/Navbar.tsx
/** Per-character roll on hover/focus (styles: .roll in styles.css). Screen readers get the plain label. */
function RollLabel({ text }) {
	const row = /* @__PURE__ */ jsx("span", { children: [...text].map((c, i) => /* @__PURE__ */ jsx("span", {
		className: "roll-c",
		style: { "--i": i },
		children: c === " " ? "\xA0" : c
	}, i)) });
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
		className: "sr-only",
		children: text
	}), /* @__PURE__ */ jsxs("span", {
		className: "roll",
		"aria-hidden": true,
		children: [row, row]
	})] });
}
function Navbar() {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (!open) return;
		const onKey = (e) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ jsxs("header", {
		className: "fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6",
		children: [/* @__PURE__ */ jsxs("nav", {
			"aria-label": "Primary",
			className: "glass mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full pl-5 pr-2 sm:h-16 sm:pl-7",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "#home",
					className: "font-display text-lg font-semibold tracking-tight",
					children: [siteConfig.shortName, /* @__PURE__ */ jsx("span", {
						className: "text-clay",
						children: "."
					})]
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "hidden items-center gap-1 lg:flex",
					children: navLinks.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
						href: l.href,
						className: "block rounded-full px-4 py-2 text-sm font-medium text-page-muted transition-colors hover:text-page-fg focus-visible:text-page-fg",
						children: /* @__PURE__ */ jsx(RollLabel, { text: l.label })
					}) }, l.href))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsxs(ButtonLink, {
						href: "#contact",
						size: "sm",
						className: "hidden sm:inline-flex",
						children: ["Start a Project ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:rotate-45" })]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-page-line lg:hidden",
						"aria-expanded": open,
						"aria-controls": "mobile-menu",
						"aria-label": open ? "Close menu" : "Open menu",
						onClick: () => setOpen((o) => !o),
						children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
					})]
				})
			]
		}), open && /* @__PURE__ */ jsxs("div", {
			id: "mobile-menu",
			className: "glass mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1240px] overflow-y-auto rounded-3xl p-4 lg:hidden",
			children: [/* @__PURE__ */ jsx("ul", {
				className: "flex flex-col",
				children: navLinks.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
					href: l.href,
					onClick: () => setOpen(false),
					className: "block rounded-2xl px-4 py-3 font-display text-2xl font-medium",
					children: l.label
				}) }, l.href))
			}), /* @__PURE__ */ jsx(ButtonLink, {
				href: "#contact",
				onClick: () => setOpen(false),
				className: "mt-3 w-full",
				children: "Start a Project"
			})]
		})]
	});
}
// src/components/ui/Container.tsx
function Container({ children, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12", className),
		children
	});
}
// src/config/sections.ts
var sectionThemes = {
	hero: "cream",
	projects: "charcoal",
	services: "sand",
	about: "moss",
	contact: "cream",
	footer: "charcoal"
};
var servicePanelThemes = [
	"cream",
	"moss",
	"charcoal",
	"clay"
];
// src/data/services.ts
var services = [
	{
		id: "web",
		title: "Web Development",
		description: "Business websites, e-commerce platforms, landing pages, and modern web applications.",
		project: "springwala"
	},
	{
		id: "mobile",
		title: "Mobile Applications",
		description: "Mobile experiences and applications designed around real user needs and business workflows.",
		project: "unstop-igniters"
	},
	{
		id: "automation",
		title: "Automation & Integrations",
		description: "Workflow automation, API integrations, messaging workflows, and repetitive-task reduction.",
		project: "vehicle-speed-detection"
	},
	{
		id: "custom",
		title: "Custom Software",
		description: "Dashboards, internal business tools, CRM-style applications, and tailored software solutions.",
		project: "crewapply"
	}
];
// src/data/socialLinks.ts
var socialLinks = [
	{
		label: "Instagram",
		href: ""
	},
	{
		label: "LinkedIn",
		href: ""
	},
	{
		label: "GitHub",
		href: ""
	}
];
// src/components/layout/Footer.tsx
function Footer() {
	const socials = socialLinks.filter((s) => s.href);
	return /* @__PURE__ */ jsx("footer", {
		"data-theme": sectionThemes.footer,
		className: "pt-24 pb-10",
		children: /* @__PURE__ */ jsxs(Container, { children: [
			/* @__PURE__ */ jsxs("a", {
				href: "#contact",
				className: "block font-display text-mega font-semibold transition-colors hover:text-clay",
				children: ["Say hello", /* @__PURE__ */ jsx("span", {
					className: "text-clay",
					children: "."
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-20 grid gap-10 border-t border-page-line pt-10 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
						className: "font-display text-xl font-semibold",
						children: [siteConfig.shortName, /* @__PURE__ */ jsx("span", {
							className: "text-clay",
							children: "."
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 max-w-xs text-sm text-page-muted",
						children: siteConfig.description
					})] }),
					/* @__PURE__ */ jsxs("nav", {
						"aria-label": "Footer",
						children: [/* @__PURE__ */ jsx("p", {
							className: "eyebrow text-page-muted",
							children: "Navigate"
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: navLinks.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: l.href,
								className: "inline-block hover:text-clay focus-visible:text-clay",
								children: /* @__PURE__ */ jsx(RollLabel, { text: l.label })
							}) }, l.href))
						})]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow text-page-muted",
						children: "Services"
					}), /* @__PURE__ */ jsx("ul", {
						className: "mt-4 space-y-2 text-sm",
						children: services.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#services",
							className: "hover:text-clay",
							children: s.title
						}) }, s.id))
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow text-page-muted",
							children: "Contact"
						}),
						/* @__PURE__ */ jsx("a", {
							href: `mailto:${siteConfig.email}`,
							className: "mt-4 block text-sm hover:text-clay",
							children: siteConfig.email
						}),
						socials.length > 0 && /* @__PURE__ */ jsx("ul", {
							className: "mt-4 flex flex-wrap gap-3 text-sm",
							children: socials.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: s.href,
								target: "_blank",
								rel: "noreferrer",
								className: "hover:text-clay",
								children: s.label
							}) }, s.label))
						})
					] })
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-16 text-xs text-page-muted",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					siteConfig.name,
					". All rights reserved."
				]
			})
		] })
	});
}
// src/config/animations.ts
var animationConfig = {
	ease: "power3.out",
	duration: 1,
	stagger: .08,
	revealDistance: 40,
	hscroll: "(min-height: 450px) and (prefers-reduced-motion: no-preference)",
	motion: "(prefers-reduced-motion: no-preference)",
	themeStart: "top 55%",
	themeEnd: "bottom 55%"
};
// src/components/animations/gsapUtils.ts
var registered = false;
/** Register plugins once, client-side only. */
function getGsap() {
	if (!registered && typeof window !== "undefined") {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.config({ ignoreMobileResize: true });
		registered = true;
	}
	return {
		gsap,
		ScrollTrigger
	};
}
/** Fade/slide-in for every [data-reveal] inside scope. */
function revealChildren(scope) {
	scope.querySelectorAll("[data-reveal]").forEach((el) => {
		gsap.from(el, {
			y: animationConfig.revealDistance,
			autoAlpha: 0,
			duration: animationConfig.duration,
			ease: animationConfig.ease,
			scrollTrigger: {
				trigger: el,
				start: "top 88%",
				once: true
			}
		});
	});
}
/** Staggered line reveal for [data-line] spans (wrapped in overflow-hidden). */
function revealLines(scope, opts = {}) {
	const lines = scope.querySelectorAll("[data-line]");
	if (!lines.length) return;
	gsap.from(lines, {
		yPercent: 110,
		duration: 1.1,
		ease: "power4.out",
		stagger: animationConfig.stagger * 1.5,
		delay: opts.delay ?? 0,
		...opts.scroll ? { scrollTrigger: {
			trigger: scope,
			start: "top 80%",
			once: true
		} } : {}
	});
}
/**
* Sticky stacked panels (Services, Projects on mobile): a panel taller than the space below
* its sticky point would have its bottom trapped under the next panel, so lift its sticky
* point to keep the bottom on screen. Re-runs before every ScrollTrigger refresh
* (resize, rotation, font/image load). Returns a cleanup.
*/
function fitStickyPanels(panels) {
	const fit = () => panels.forEach((p) => {
		p.style.top = "";
		const top = parseFloat(getComputedStyle(p).top);
		const over = top + p.offsetHeight + 16 - window.innerHeight;
		if (over > 0) p.style.top = `${top - over}px`;
	});
	fit();
	ScrollTrigger.addEventListener("refreshInit", fit);
	return () => {
		ScrollTrigger.removeEventListener("refreshInit", fit);
		panels.forEach((p) => p.style.top = "");
	};
}
/** Slightly shrink each sticky panel as the next one slides up over it. */
function shrinkCoveredPanels(panels) {
	panels.slice(0, -1).forEach((panel, i) => {
		const next = panels[i + 1];
		gsap.to(panel, {
			scale: .95,
			ease: "none",
			scrollTrigger: {
				trigger: next,
				scrub: true,
				invalidateOnRefresh: true,
				start: "top bottom",
				end: () => `top ${parseFloat(getComputedStyle(next).top)}px`
			}
		});
	});
}
// src/hooks/useGsapScope.ts
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
/**
* Runs setup inside a scoped gsap.matchMedia so every tween/ScrollTrigger
* created is reverted on unmount (safe under StrictMode double-mount).
* Setup receives the matchMedia instance to add per-breakpoint logic.
*/
function useGsapScope(setup) {
	const ref = useRef(null);
	useIsoLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		const { gsap } = getGsap();
		const mm = gsap.matchMedia(el);
		setup(el, mm, gsap);
		return () => mm.revert();
	}, []);
	return ref;
}
// src/data/projects.ts
var projects = [
	{
		slug: "springwala",
		name: "Springwala",
		category: "E-commerce Platform",
		description: "Storefront, catalogue and checkout flow for a direct-to-consumer brand.",
		year: "2025",
		image: "/assets/project-springwala-CfFpS7au.jpg",
		imageAlt: "Springwala storefront shown on a laptop and phone"
	},
	{
		slug: "crewapply",
		name: "CrewApply",
		category: "Recruitment Platform",
		description: "Candidate pipeline and application tracking for hiring teams.",
		year: "2025",
		image: "/assets/project-crewapply-CIhA_qTO.jpg",
		imageAlt: "CrewApply candidate dashboard on a desktop monitor"
	},
	{
		slug: "vehicle-speed-detection",
		name: "Vehicle Speed Detection",
		category: "Computer Vision",
		description: "Detection and speed estimation of vehicles from roadside video.",
		year: "2024",
		image: "/assets/project-speed-BmciRld8.jpg",
		imageAlt: "Highway footage with vehicle bounding boxes and speed labels"
	},
	{
		slug: "unstop-igniters",
		name: "Unstop Igniters Club",
		category: "Events Platform",
		description: "Event discovery and registration hub for a student community.",
		year: "2024",
		image: "/assets/project-igniters-Bxra3uHn.jpg",
		imageAlt: "Events platform interface on a tablet next to event tickets"
	}
];
// src/components/sections/HeroSection.tsx
var featured = projects[0];
var lines = [
	"We build",
	"digital products",
	"that do the work."
];
/** Statement beside the hero image. `accent` reveals in moss; `breakAfter` breaks the line from lg up. */
var statement = [
	{
		text: "Anyone can make.",
		breakAfter: true
	},
	{ text: "Creating experiences that resonate with culture and business is" },
	{
		text: "the hard part.",
		accent: true,
		breakAfter: true
	},
	{ text: "It takes design, technology and human judgment." }
];
function HeroSection() {
	const ref = useGsapScope((scope, mm, gsap) => {
		mm.add(animationConfig.motion, () => {
			revealLines(scope, { delay: .15 });
			gsap.from(scope.querySelectorAll("[data-hero-fade]"), {
				autoAlpha: 0,
				y: 20,
				duration: 1,
				delay: .7,
				stagger: .1,
				ease: "power3.out"
			});
			gsap.to(scope.querySelector("[data-hero-visual]"), {
				yPercent: -12,
				ease: "none",
				scrollTrigger: {
					trigger: scope,
					start: "top top",
					end: "bottom top",
					scrub: true
				}
			});
			const statementEl = scope.querySelector("[data-statement]");
			gsap.fromTo(scope.querySelectorAll("[data-word]"), { opacity: .18 }, {
				opacity: 1,
				ease: "none",
				stagger: .1,
				scrollTrigger: {
					trigger: statementEl,
					start: "clamp(top 85%)",
					end: "clamp(bottom 50%)",
					scrub: .4
				}
			});
		});
	});
	return /* @__PURE__ */ jsx("section", {
		id: "home",
		ref,
		"data-theme": sectionThemes.hero,
		"aria-labelledby": "hero-title",
		className: "relative pb-20 lg:pb-28",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col pt-[clamp(6.5rem,18svh,10rem)] lg:min-h-svh lg:justify-center lg:pb-[6svh]",
			children: [/* @__PURE__ */ jsx("p", {
				"data-hero-fade": true,
				className: "eyebrow mb-8 text-page-muted",
				children: "Independent IT solutions studio"
			}), /* @__PURE__ */ jsx("h1", {
				id: "hero-title",
				className: "text-mega font-semibold",
				children: lines.map((l, i) => /* @__PURE__ */ jsx("span", {
					className: "block overflow-hidden pb-[0.06em]",
					children: /* @__PURE__ */ jsx("span", {
						"data-line": true,
						className: `block ${i === 1 ? "italic font-light text-moss" : ""}`,
						children: l
					})
				}, l))
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-12 grid gap-10 lg:mt-0 lg:grid-cols-12 lg:items-end",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-5",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: statement.map((s) => s.text).join(" ")
					}),
					/* @__PURE__ */ jsx("p", {
						"data-statement": true,
						"aria-hidden": true,
						className: "mb-10 font-display text-[clamp(1.5rem,2.4vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]",
						children: statement.map((s, i) => /* @__PURE__ */ jsxs("span", { children: [s.text.split(" ").map((w, j) => /* @__PURE__ */ jsxs("span", {
							"data-word": true,
							className: s.accent ? "text-moss" : void 0,
							children: [w, " "]
						}, j)), s.breakAfter && /* @__PURE__ */ jsx("br", { className: "hidden lg:inline" })] }, i))
					}),
					/* @__PURE__ */ jsx("p", {
						"data-hero-fade": true,
						className: "max-w-md text-lg leading-relaxed text-page-muted",
						children: "Websites, mobile apps, automations and custom software for businesses that want technology to feel effortless."
					}),
					/* @__PURE__ */ jsxs("div", {
						"data-hero-fade": true,
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsxs(ButtonLink, {
							href: "#contact",
							size: "lg",
							children: ["Start a Project ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:rotate-45" })]
						}), /* @__PURE__ */ jsxs(ButtonLink, {
							href: "#work",
							variant: "outline",
							size: "lg",
							children: ["Explore Our Work ", /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" })]
						})]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				"data-hero-visual": true,
				className: "lg:col-span-7",
				children: /* @__PURE__ */ jsxs("div", {
					"data-hero-fade": true,
					className: "relative aspect-[16/10] overflow-hidden rounded-3xl bg-sand",
					children: [/* @__PURE__ */ jsx("img", {
						src: featured.image,
						alt: featured.imageAlt,
						width: 1600,
						height: 1008,
						className: "h-full w-full object-cover",
						fetchPriority: "high"
					}), /* @__PURE__ */ jsx("span", {
						className: "glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-xs font-semibold",
						children: "Selected work · 2024—2025"
					})]
				})
			})]
		})] })
	});
}
// src/components/ui/SectionHeading.tsx
function SectionHeading({ index, eyebrow, title, id }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ jsxs("p", {
			"data-reveal": true,
			className: "eyebrow flex items-center gap-3 text-page-muted",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "tabular-nums",
					children: index
				}),
				/* @__PURE__ */ jsx("span", {
					className: "h-px w-10 bg-page-line",
					"aria-hidden": true
				}),
				eyebrow
			]
		}), /* @__PURE__ */ jsx("h2", {
			id,
			className: "text-huge font-semibold",
			children: title
		})]
	});
}
// src/components/projects/ProjectCard.tsx
function ProjectCard({ project, index }) {
	const number = String(index + 1).padStart(2, "0");
	return /* @__PURE__ */ jsxs("article", {
		className: "@container group flex w-[calc(100vw_-_4.5rem)] max-w-[44rem] shrink-0 snap-center flex-col gap-5 sm:w-[64vw] lg:w-[50vw] hscroll:max-w-[calc((100svh_-_17.5rem)_*_1.6)] hscroll:gap-4 max-lg:rounded-[2rem] max-lg:border max-lg:border-page-line max-lg:bg-[color-mix(in_oklab,var(--page-fg)_7%,var(--page-bg))] max-lg:p-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between lg:hidden",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-display text-[clamp(3rem,16cqi,4.5rem)] leading-[0.85] font-semibold tabular-nums",
					"aria-hidden": true,
					children: number
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold tabular-nums text-page-muted",
					children: project.year
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative aspect-[16/10] overflow-hidden rounded-3xl bg-page-line max-lg:order-last max-lg:rounded-2xl max-lg:hscroll:aspect-auto max-lg:hscroll:h-[80cqi] max-lg:hscroll:min-h-[7rem]",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: project.image,
						alt: project.imageAlt,
						width: 1600,
						height: 1008,
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "absolute border border-page-line bg-page/70 left-3 top-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold tabular-nums max-lg:hidden @sm:left-4 @sm:top-4 @sm:px-3 @sm:py-1.5 @sm:text-xs",
						children: [
							number,
							" / ",
							project.year
						]
					}),
					project.url ? /* @__PURE__ */ jsx("a", {
						href: project.url,
						target: "_blank",
						rel: "noreferrer",
						"aria-label": `View ${project.name}`,
						className: "absolute border border-page-line bg-page/70 right-3 top-3 flex h-9 w-9 items-center @sm:right-4 @sm:top-4 @sm:h-11 @sm:w-11 justify-center rounded-full transition-colors hover:bg-page-fg hover:text-page",
						children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-5 w-5" })
					}) : /* @__PURE__ */ jsx("span", {
						className: "absolute border border-page-line bg-page/70 right-3 top-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold @sm:right-4 @sm:top-4 @sm:px-3 @sm:py-1.5 @sm:text-xs",
						title: "Case study link coming soon",
						children: "View Project · soon"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 max-lg:mt-auto",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow text-clay",
						children: project.category
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-2 text-[clamp(1.5rem,8cqi,3.25rem)] leading-[1.02] font-semibold",
						children: project.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 max-w-md text-[0.9375rem] leading-relaxed text-page-muted @sm:mt-3 @sm:text-base",
						children: project.description
					})
				]
			})
		]
	});
}
// src/components/sections/ProjectsSection.tsx
/**
* Motion allowed (any width, 450px+ tall): cards pin and vertical scroll drives the track's x.
* Reduced motion / landscape phones: the track is a native, touch-friendly swipe row with snap.
*/
function ProjectsSection() {
	const ref = useGsapScope((scope, mm, gsap) => {
		mm.add(animationConfig.motion, () => revealChildren(scope));
		mm.add({
			hscroll: animationConfig.hscroll,
			lg: "(min-width: 1024px)"
		}, (ctx) => {
			const { hscroll, lg } = ctx.conditions;
			if (!hscroll) return;
			const pin = scope.querySelector(lg ? "[data-pin]" : "[data-pin-outer]");
			const track = scope.querySelector("[data-track]");
			const progress = scope.querySelector("[data-progress]");
			const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
			const cards = gsap.utils.toArray("article", track);
			const snapToCard = (v, st) => {
				const d = distance() || 1;
				const pts = cards.map((c) => Math.min(1, (c.offsetLeft - cards[0].offsetLeft) / d));
				const nearest = gsap.utils.snap(pts, v);
				if (Math.abs(v - nearest) < .15 / (pts.length - 1)) return nearest;
				return getGsap().ScrollTrigger.snapDirectional(pts)(v, st?.direction ?? 1);
			};
			gsap.to(track, {
				x: () => -distance(),
				ease: "none",
				scrollTrigger: {
					trigger: pin,
					start: "top top",
					end: () => `+=${distance()}`,
					pin: true,
					scrub: .5,
					snap: lg ? void 0 : {
						snapTo: snapToCard,
						duration: {
							min: .2,
							max: .5
						},
						delay: .08,
						ease: "power1.inOut"
					},
					invalidateOnRefresh: true,
					onUpdate: (self) => progress && gsap.set(progress, { scaleX: self.progress })
				}
			});
		});
	});
	return /* @__PURE__ */ jsx("section", {
		id: "work",
		ref,
		"data-theme": sectionThemes.projects,
		"aria-labelledby": "work-title",
		className: "relative py-20 hscroll:pb-0",
		children: /* @__PURE__ */ jsxs("div", {
			"data-pin-outer": true,
			className: "max-lg:hscroll:flex max-lg:hscroll:h-svh max-lg:hscroll:flex-col max-lg:hscroll:justify-center max-lg:hscroll:pb-6 max-lg:hscroll:overflow-hidden max-lg:hscroll:pt-[4.75rem] sm:max-lg:hscroll:pt-[5.5rem]",
			children: [/* @__PURE__ */ jsxs(Container, {
				className: "flex items-end justify-between gap-6 pb-10 max-lg:hscroll:pb-5",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					index: "01",
					eyebrow: "Selected work",
					id: "work-title",
					title: /* @__PURE__ */ jsx(Fragment, { children: "Projects" })
				}), /* @__PURE__ */ jsx("p", {
					"data-reveal": true,
					className: "hidden max-w-xs text-sm text-page-muted md:block",
					children: "A selection of recent builds. Scroll to browse — full case studies coming soon."
				})]
			}), /* @__PURE__ */ jsxs("div", {
				"data-pin": true,
				className: "flex flex-col max-lg:hscroll:min-h-0 lg:justify-center-safe lg:hscroll:h-svh lg:hscroll:overflow-hidden lg:hscroll:pt-[5.5rem]",
				children: [/* @__PURE__ */ jsx("div", {
					"data-track": true,
					className: "flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 max-lg:hscroll:min-h-0 sm:gap-6 sm:px-8 lg:gap-10 lg:px-12 hscroll:w-max hscroll:snap-none hscroll:overflow-visible hscroll:pb-4 hscroll:will-change-transform [scrollbar-width:none]",
					tabIndex: 0,
					"aria-label": "Project list",
					children: projects.map((p, i) => /* @__PURE__ */ jsx(ProjectCard, {
						project: p,
						index: i
					}, p.slug))
				}), /* @__PURE__ */ jsx(Container, {
					className: "hidden hscroll:block",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-px w-full bg-page-line",
						children: /* @__PURE__ */ jsx("div", {
							"data-progress": true,
							className: "h-px origin-left scale-x-0 bg-page-fg"
						})
					})
				})]
			})]
		})
	});
}
// src/components/sections/ServicesSection.tsx
/**
* Stacked panels: each panel is CSS-sticky (all screen sizes), settling a little
* lower than the previous one, so the next panel slides up over it. GSAP only
* adds a slight shrink to the covered panel. `stack` screens get fixed-height side-by-side panels.
*/
function ServicesSection() {
	const ref = useGsapScope((scope, mm, gsap) => {
		mm.add(animationConfig.motion, () => revealChildren(scope));
		const panels = gsap.utils.toArray("[data-panel]", scope);
		mm.add("(min-width: 0px)", () => fitStickyPanels(panels));
		mm.add(animationConfig.motion, () => shrinkCoveredPanels(panels));
	});
	return /* @__PURE__ */ jsx("section", {
		id: "services",
		ref,
		"data-theme": sectionThemes.services,
		"aria-labelledby": "services-title",
		className: "py-24 lg:pt-40 lg:pb-24",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsx(SectionHeading, {
			index: "02",
			eyebrow: "What we do",
			id: "services-title",
			title: /* @__PURE__ */ jsxs(Fragment, { children: [
				"Services,",
				/* @__PURE__ */ jsx("br", {}),
				/* @__PURE__ */ jsx("span", {
					className: "italic font-light",
					children: "end to end."
				})
			] })
		}), /* @__PURE__ */ jsx("ol", {
			className: "mt-12 flex flex-col gap-6 lg:mt-20",
			children: services.map((s, i) => {
				const project = projects.find((p) => p.slug === s.project);
				return /* @__PURE__ */ jsx("li", {
					"data-panel": servicePanelThemes[i % servicePanelThemes.length],
					style: {
						"--i": i,
						"--n": services.length
					},
					className: "origin-top rounded-[2rem] bg-page p-6 text-page-fg shadow-[0_-16px_40px_-24px_rgb(0_0_0/0.45)] sm:p-8 lg:p-10 sticky top-[calc(4.75rem_+_var(--i)_*_0.75rem)] sm:top-[calc(5.75rem_+_var(--i)_*_1rem)] stack:h-[calc(100svh_-_7.25rem_-_(var(--n)_-_1)_*_1rem)]",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 sm:gap-8 lg:grid-cols-12 stack:h-full",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col justify-between gap-4 sm:gap-6 lg:col-span-5",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-display text-[clamp(3.5rem,min(9vw,14svh),9rem)] leading-[0.85] font-semibold tabular-nums",
								"aria-hidden": true,
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-[clamp(1.9rem,min(3.6vw,6.5svh),4rem)] leading-[1] font-semibold",
								children: s.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-md text-page-muted sm:mt-4 lg:text-lg",
								children: s.description
							})] })]
						}), project && /* @__PURE__ */ jsxs("div", {
							className: "relative h-[28svh] min-h-0 overflow-hidden sm:h-[36svh] stack:h-auto rounded-2xl border border-page-line lg:col-span-7 stack:aspect-auto",
							children: [/* @__PURE__ */ jsx("img", {
								src: project.image,
								alt: project.imageAlt,
								width: 1600,
								height: 1008,
								loading: "lazy",
								className: "h-full w-full object-cover"
							}), /* @__PURE__ */ jsxs("span", {
								className: "absolute bottom-4 left-4 rounded-full border border-page-line bg-page/70 px-3 py-1.5 text-xs font-semibold",
								children: ["Example · ", project.name]
							})]
						})]
					})
				}, s.id);
			})
		})] })
	});
}
// src/components/sections/AnimationSection.tsx
/**
* Self-contained interlude (doubles as the About anchor). Rows of type drift
* in opposite directions; geometric marks rotate with scroll. Swap freely.
*/
var rows = [
	"Design · Code · Automate ·",
	"Think clearly · Ship carefully ·",
	"Small studio · Serious craft ·"
];
function AnimationSection() {
	const ref = useGsapScope((scope, mm, gsap) => {
		mm.add(animationConfig.motion, () => {
			revealChildren(scope);
			const trig = {
				trigger: scope,
				start: "top bottom",
				end: "bottom top",
				scrub: .6
			};
			scope.querySelectorAll("[data-row]").forEach((row, i) => {
				gsap.fromTo(row, { xPercent: i % 2 ? -25 : 0 }, {
					xPercent: i % 2 ? 0 : -25,
					ease: "none",
					scrollTrigger: trig
				});
			});
			gsap.to(scope.querySelectorAll("[data-shape]"), {
				rotate: (i) => i % 2 ? -180 : 180,
				ease: "none",
				scrollTrigger: trig
			});
		});
	});
	return /* @__PURE__ */ jsxs("section", {
		id: "about",
		ref,
		"data-theme": sectionThemes.about,
		"aria-labelledby": "about-title",
		className: "relative overflow-hidden py-24 lg:py-40",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-2 select-none",
			"aria-hidden": true,
			children: rows.map((r, i) => /* @__PURE__ */ jsxs("div", {
				"data-row": true,
				className: `whitespace-nowrap text-huge font-display font-semibold ${i === 1 ? "outline-text" : ""}`,
				children: [
					r,
					" ",
					r
				]
			}, r))
		}), /* @__PURE__ */ jsxs(Container, {
			className: "relative mt-20 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:items-center",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto aspect-square w-56 sm:w-72 lg:col-span-5 lg:w-80",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ jsx("div", {
						"data-shape": true,
						className: "absolute inset-0 rounded-full border border-page-line"
					}),
					/* @__PURE__ */ jsx("div", {
						"data-shape": true,
						className: "absolute inset-8 rounded-[2rem] border border-page-fg/40"
					}),
					/* @__PURE__ */ jsx("div", {
						"data-shape": true,
						className: "absolute inset-16 rounded-full bg-clay"
					}),
					/* @__PURE__ */ jsx("div", {
						"data-shape": true,
						className: "absolute inset-[38%] rounded-md bg-page-fg"
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-6 lg:col-start-7",
				children: [
					/* @__PURE__ */ jsx("p", {
						"data-reveal": true,
						className: "eyebrow text-page-muted",
						children: "03 — About the studio"
					}),
					/* @__PURE__ */ jsx("h2", {
						id: "about-title",
						"data-reveal": true,
						className: "mt-6 text-big font-semibold",
						children: "An independent studio that treats your business like it's our own product."
					}),
					/* @__PURE__ */ jsx("p", {
						"data-reveal": true,
						className: "mt-6 max-w-lg text-page-muted",
						children: "We keep teams small and communication direct. You work with the people who design and build your project — no hand-offs, no hidden layers."
					})
				]
			})]
		})]
	});
}
// src/components/contact/FormField.tsx
var fieldClass = "w-full rounded-2xl border border-page-line bg-transparent px-4 py-3.5 text-base text-page-fg placeholder:text-page-muted/70 transition-colors focus:border-page-fg focus:outline-none aria-[invalid=true]:border-destructive";
function FormField({ id, label, optional, error, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id,
				className: "text-sm font-semibold",
				children: [
					label,
					" ",
					optional && /* @__PURE__ */ jsx("span", {
						className: "font-normal text-page-muted",
						children: "(optional)"
					})
				]
			}),
			children,
			error && /* @__PURE__ */ jsx("p", {
				id: `${id}-error`,
				className: "text-sm text-destructive",
				children: error
			})
		]
	});
}
// node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
// src/lib/contact/contact.functions.ts
var submitContact = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("4b1aae7945862957fe97466ef16978584ba0f687eb4729a1989e4f8a57959af3"));
// src/components/contact/ContactForm.tsx
function ContactForm() {
	const [status, setStatus] = useState({ state: "idle" });
	const [errors, setErrors] = useState({});
	const startedAt = useRef(Date.now());
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const payload = {
			...Object.fromEntries(fd.entries()),
			startedAt: startedAt.current
		};
		const parsed = contactSchema.safeParse(payload);
		if (!parsed.success) {
			const fe = {};
			for (const i of parsed.error.issues) fe[String(i.path[0])] ??= i.message;
			setErrors(fe);
			return;
		}
		setErrors({});
		setStatus({ state: "loading" });
		try {
			const res = await submitContact({ data: parsed.data });
			if (res.ok) setStatus({ state: "success" });
			else {
				if (res.fieldErrors) setErrors(res.fieldErrors);
				setStatus({
					state: "error",
					message: res.message
				});
			}
		} catch {
			setStatus({
				state: "error",
				message: "Network error. Please try again."
			});
		}
	}
	if (status.state === "success") return /* @__PURE__ */ jsxs("div", {
		role: "status",
		className: "flex flex-col items-start gap-4 rounded-3xl border border-page-line p-8 sm:p-12",
		children: [
			/* @__PURE__ */ jsx(CheckCircle2, {
				className: "h-10 w-10 text-moss",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-big font-semibold",
				children: "Thanks — message received."
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-page-muted",
				children: "We'll reply within two working days."
			})
		]
	});
	const err = (k) => ({
		"aria-invalid": !!errors[k] || void 0,
		"aria-describedby": errors[k] ? `${k}-error` : void 0
	});
	return /* @__PURE__ */ jsxs("form", {
		onSubmit,
		noValidate: true,
		className: "grid gap-5 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ jsx(FormField, {
				id: "name",
				label: "Full name",
				error: errors["name"],
				children: /* @__PURE__ */ jsx("input", {
					id: "name",
					name: "name",
					autoComplete: "name",
					required: true,
					className: fieldClass,
					...err("name")
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				id: "email",
				label: "Email address",
				error: errors["email"],
				children: /* @__PURE__ */ jsx("input", {
					id: "email",
					name: "email",
					type: "email",
					autoComplete: "email",
					required: true,
					className: fieldClass,
					...err("email")
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				id: "business",
				label: "Business name",
				optional: true,
				error: errors["business"],
				children: /* @__PURE__ */ jsx("input", {
					id: "business",
					name: "business",
					autoComplete: "organization",
					className: fieldClass
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				id: "service",
				label: "Service required",
				error: errors["service"],
				children: /* @__PURE__ */ jsxs("select", {
					id: "service",
					name: "service",
					required: true,
					defaultValue: "",
					className: fieldClass,
					...err("service"),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						disabled: true,
						children: "Select a service"
					}), serviceOptions.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "sm:col-span-2",
				children: /* @__PURE__ */ jsx(FormField, {
					id: "message",
					label: "Project description",
					error: errors["message"],
					children: /* @__PURE__ */ jsx("textarea", {
						id: "message",
						name: "message",
						rows: 5,
						required: true,
						placeholder: "What are you building, and what does success look like?",
						className: fieldClass,
						...err("message")
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				id: "budget",
				label: "Budget range",
				optional: true,
				children: /* @__PURE__ */ jsxs("select", {
					id: "budget",
					name: "budget",
					defaultValue: "",
					className: fieldClass,
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Prefer not to say"
					}), budgetOptions.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				id: "timeline",
				label: "Expected timeline",
				optional: true,
				children: /* @__PURE__ */ jsxs("select", {
					id: "timeline",
					name: "timeline",
					defaultValue: "",
					className: fieldClass,
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Not decided"
					}), timelineOptions.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute -left-[9999px]",
				"aria-hidden": true,
				children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "website",
					children: "Website"
				}), /* @__PURE__ */ jsx("input", {
					id: "website",
					name: "website",
					tabIndex: -1,
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					"aria-live": "polite",
					className: "text-sm",
					children: status.state === "error" && /* @__PURE__ */ jsxs("p", {
						className: "text-destructive",
						children: [
							status.message,
							" ",
							/* @__PURE__ */ jsx("a", {
								href: `mailto:${siteConfig.email}`,
								className: "underline",
								children: siteConfig.email
							})
						]
					})
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					size: "lg",
					disabled: status.state === "loading",
					children: status.state === "loading" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Sending…"] }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Send enquiry ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:rotate-45" })] })
				})]
			})
		]
	});
}
// src/components/sections/ContactSection.tsx
function ContactSection() {
	const ref = useGsapScope((scope, mm) => {
		mm.add(animationConfig.motion, () => revealChildren(scope));
	});
	return /* @__PURE__ */ jsx("section", {
		id: "contact",
		ref,
		"data-theme": sectionThemes.contact,
		"aria-labelledby": "contact-title",
		className: "relative py-24 lg:py-40",
		children: /* @__PURE__ */ jsxs(Container, {
			className: "grid gap-14 lg:grid-cols-12",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-5",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						index: "04",
						eyebrow: "Contact",
						id: "contact-title",
						title: /* @__PURE__ */ jsxs(Fragment, { children: [
							"Let's build",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("span", {
								className: "italic font-light text-moss",
								children: "something good."
							})
						] })
					}),
					/* @__PURE__ */ jsx("p", {
						"data-reveal": true,
						className: "mt-6 max-w-sm text-page-muted",
						children: "Tell us about your project. We reply to every enquiry personally."
					}),
					/* @__PURE__ */ jsxs("ul", {
						"data-reveal": true,
						className: "mt-10 flex flex-col gap-3",
						children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: `mailto:${siteConfig.email}`,
							className: "inline-flex items-center gap-3 text-lg font-semibold hover:text-clay",
							children: [
								/* @__PURE__ */ jsx(Mail, {
									className: "h-5 w-5",
									"aria-hidden": true
								}),
								" ",
								siteConfig.email
							]
						}) }), siteConfig.whatsapp && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
							href: `https://wa.me/${siteConfig.whatsapp}`,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-3 text-lg font-semibold hover:text-clay",
							children: [/* @__PURE__ */ jsx(MessageCircle, {
								className: "h-5 w-5",
								"aria-hidden": true
							}), " WhatsApp"]
						}) })]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				"data-reveal": true,
				className: "lg:col-span-7",
				children: /* @__PURE__ */ jsx(ContactForm, {})
			})]
		})
	});
}
// src/components/animations/BackgroundTransitions.tsx
/**
* Single owner of the page background. Watches every [data-theme] section
* and sets <html data-theme>; CSS transitions handle the color blend.
* Using one trigger per section with toggle callbacks avoids competing tweens.
*/
function BackgroundTransitions() {
	useEffect(() => {
		const { ScrollTrigger } = getGsap();
		const root = document.documentElement;
		const sections = Array.from(document.querySelectorAll("section[data-theme], footer[data-theme]"));
		const set = (t) => t && root.dataset["theme"] !== t && (root.dataset["theme"] = t);
		const triggers = sections.map((s) => ScrollTrigger.create({
			trigger: s,
			start: animationConfig.themeStart,
			end: animationConfig.themeEnd,
			onToggle: (self) => self.isActive && set(s.dataset["theme"])
		}));
		set(sections.find((s) => ScrollTrigger.isInViewport(s, .45))?.dataset["theme"] ?? "cream");
		const refresh = () => ScrollTrigger.refresh();
		window.addEventListener("load", refresh);
		document.fonts?.ready.then(refresh);
		return () => {
			triggers.forEach((t) => t.kill());
			window.removeEventListener("load", refresh);
			delete root.dataset["theme"];
		};
	}, []);
	return null;
}
// src/routes/index.tsx?tsr-split=component
function Index() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("a", {
			href: "#main",
			className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-page-fg focus:px-4 focus:py-2 focus:text-page",
			children: "Skip to content"
		}),
		/* @__PURE__ */ jsx(Navbar, {}),
		/* @__PURE__ */ jsxs("main", {
			id: "main",
			children: [
				/* @__PURE__ */ jsx(HeroSection, {}),
				/* @__PURE__ */ jsx(ProjectsSection, {}),
				/* @__PURE__ */ jsx(ServicesSection, {}),
				/* @__PURE__ */ jsx(AnimationSection, {}),
				/* @__PURE__ */ jsx(ContactSection, {})
			]
		}),
		/* @__PURE__ */ jsx(Footer, {}),
		/* @__PURE__ */ jsx(BackgroundTransitions, {})
	] });
}
export { Index as component };
