import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Presence, b as Primitive, d as useControllableState, e as useComposedRefs, f as composeEventHandlers, g as useSize, h as createContextScope, i as cn, k as useNavigate, l as Video, T as Trophy, M as Megaphone, B as Button, I as Input, m as ue } from "./index-CTQZhAh4.js";
import { u as usePrevious, C as Check } from "./index-CHUbwfjU.js";
import { L as Label } from "./label-BB2fwEXE.js";
import { e as useRegisterUser } from "./useQueries-DZXfnpWg.js";
import { m as motion } from "./proxy-DbIMGeAH.js";
import { W as Wallet } from "./wallet-B2of_ByV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const roles = [
  {
    id: "creator",
    label: "Creator",
    icon: Video,
    description: "Upload videos and earn 25%+ of revenue from your audience",
    highlight: "Earn 25% revenue share",
    color: "primary"
  },
  {
    id: "viewer",
    label: "Viewer",
    icon: Trophy,
    description: "Watch great content and earn 1% of platform revenue per hour",
    highlight: "Earn while you watch",
    color: "accent"
  },
  {
    id: "advertiser",
    label: "Advertiser",
    icon: Megaphone,
    description: "Reach engaged audiences with premium ad slots and airway time",
    highlight: "Premium placement",
    color: "primary"
  }
];
const disclaimerSections = [
  {
    id: "wallet",
    icon: Wallet,
    title: "Section 1: Wallet Requirement",
    variant: "info",
    content: [
      "All users — creators, advertisers, and the platform owner — are required to have their own individual wallet account.",
      "Caffeine AI will facilitate wallet availability for all parties.",
      "You must have your wallet set up before engaging in any financial transactions on this platform."
    ]
  },
  {
    id: "sabbath",
    icon: TriangleAlert,
    title: "Section 2: Advertiser Sabbath Observance Schedule",
    variant: "warning",
    content: [
      "Advertisers are subject to a strict operational schedule in observance of the Sabbath.",
      "All advertising activity must STOP on Friday at 4:00 PM and may not RESUME until Sunday at 12:00 AM (midnight).",
      "No work of any kind is to be performed on the Sabbath. This schedule is strictly enforced."
    ]
  },
  {
    id: "content",
    icon: TriangleAlert,
    title: "Section 3: Content Restrictions & Prohibited Material",
    variant: "danger",
    content: [],
    bullets: [
      "Adult entertainment of ANY kind, including explicit sexual content (XXX)",
      "Any genre of music containing vulgar, obscene language, profanity, or cuss words",
      "Any content depicting women in an immodest manner — including showing cleavage, backside, legs, stomach, or any other body parts that violate modesty standards",
      "Grassroots entertainment of any kind",
      "Any Hollywood-produced entertainment, films, music, or media from top to bottom",
      "Vulgar, obscene, or profane language or imagery in any form",
      "Any polluted imagery or communication that provokes ungodliness, unYahliness, or sin",
      "Any content that violates the commandments of Yahweh as spoken in Exodus through Deuteronomy"
    ],
    footer: "We strongly urge all users to read and familiarize themselves with the Commandments of Emperor Yahweh found in Exodus through Deuteronomy."
  },
  {
    id: "penalties",
    icon: TriangleAlert,
    title: "Section 4: Legal Penalties & Enforcement",
    variant: "danger",
    content: [
      "This agreement constitutes a LEGALLY BINDING CONTRACT between the platform and each user."
    ],
    subsections: [
      {
        label: "For ADVERTISERS and CONTENT CREATORS:",
        items: [
          "Financial Penalty: $1,000,000,000 (ONE BILLION DOLLARS) per transaction in violation",
          "Permanent expulsion from the platform with no right of return"
        ]
      },
      {
        label: "For VIEWERS who post, share, or link to unYahly or sinful content:",
        items: [
          "Financial Penalty: $100,000 per infraction",
          "Permanent expulsion from the platform with no right of return"
        ]
      }
    ]
  },
  {
    id: "acknowledgment",
    icon: FileText,
    title: "Section 5: Acknowledgment",
    variant: "info",
    content: ["By creating an account on this platform, you acknowledge that:"],
    bullets: [
      "You have read and understood all of the above terms",
      "You agree to abide by all platform statutes, rules, and the commandments of Emperor Yahweh",
      "You understand this is a legally binding contract",
      "You accept all financial penalties and consequences for any violations"
    ]
  }
];
function OnboardingPage() {
  const [selectedRole, setSelectedRole] = reactExports.useState(null);
  const [username, setUsername] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [step, setStep] = reactExports.useState("role");
  const [agreed, setAgreed] = reactExports.useState(false);
  const navigate = useNavigate();
  const register = useRegisterUser();
  const handleContinue = () => {
    if (!selectedRole) return;
    setStep("details");
  };
  const handleDetailsNext = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;
    setStep("disclaimer");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !selectedRole || !agreed) return;
    try {
      await register.mutateAsync({
        username: username.trim(),
        email: email.trim(),
        role: selectedRole
      });
      ue.success("Welcome to YHWH Corner!", {
        description: "Your profile has been created."
      });
      navigate({ to: "/" });
    } catch {
      ue.error("Registration failed", { description: "Please try again." });
    }
  };
  const stepLabels = {
    role: "Choose your role to get started",
    details: "Tell us a bit about yourself",
    disclaimer: "Review & agree to the Platform Agreement"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-background",
      "data-ocid": "onboarding-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "text-center mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 gradient-magenta-cyan rounded-2xl mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { size: 24, className: "text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl text-foreground", children: [
                "Welcome to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-magenta", children: "YHWH Corner" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-lg", children: stepLabels[step] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mt-5", children: ["role", "details", "disclaimer"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${step === s ? "gradient-magenta-cyan text-white shadow-elevated" : step === "details" && s === "role" || step === "disclaimer" && s !== "disclaimer" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`,
                    children: step === "details" && s === "role" || step === "disclaimer" && s !== "disclaimer" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, strokeWidth: 3 }) : i + 1
                  }
                ),
                i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-0.5 rounded-full transition-smooth ${step === "details" && i === 0 || step === "disclaimer" ? "bg-primary/40" : "bg-border"}`
                  }
                )
              ] }, s)) })
            ]
          }
        ),
        step === "role" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.1 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8", children: roles.map((role, i) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: i * 0.1 + 0.2 },
                    onClick: () => setSelectedRole(role.id),
                    className: `relative p-5 rounded-2xl border-2 text-left transition-smooth cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary bg-primary/10 shadow-elevated" : "border-border bg-card hover:border-border/80 hover:bg-card/80"}`,
                    "data-ocid": `role-${role.id}`,
                    children: [
                      isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Check,
                        {
                          size: 11,
                          className: "text-primary-foreground",
                          strokeWidth: 3
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isSelected ? "gradient-magenta-cyan" : "bg-secondary"}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              size: 18,
                              className: isSelected ? "text-white" : "text-muted-foreground"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base", children: role.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground leading-relaxed", children: role.description }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `mt-3 text-xs font-semibold ${isSelected ? "text-primary" : "text-accent"}`,
                          children: [
                            "✦ ",
                            role.highlight
                          ]
                        }
                      )
                    ]
                  },
                  role.id
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleContinue,
                  disabled: !selectedRole,
                  className: "w-full gradient-magenta-cyan text-white border-0 h-12 font-display font-bold text-base",
                  "data-ocid": "onboarding-continue",
                  children: [
                    "Continue as",
                    " ",
                    selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) : "…",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
                  ]
                }
              )
            ]
          }
        ),
        step === "details" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                selectedRole && (() => {
                  const role = roles.find((r) => r.id === selectedRole);
                  const Icon = role.icon;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 gradient-magenta-cyan rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, className: "text-white" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground capitalize", children: role.label })
                  ] });
                })(),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep("role"),
                    className: "ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors",
                    children: "Change role"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleDetailsNext,
                  className: "space-y-4",
                  "data-ocid": "onboarding-form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "username",
                          className: "font-display font-semibold",
                          children: "Username"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "username",
                          type: "text",
                          placeholder: "yourname",
                          value: username,
                          onChange: (e) => setUsername(e.target.value),
                          required: true,
                          className: "bg-secondary/40 border-border/60 focus:border-primary/60 h-11",
                          "data-ocid": "onboarding-username"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "font-display font-semibold", children: "Email" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "email",
                          type: "email",
                          placeholder: "you@example.com",
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          required: true,
                          className: "bg-secondary/40 border-border/60 focus:border-primary/60 h-11",
                          "data-ocid": "onboarding-email"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        disabled: !username.trim() || !email.trim(),
                        className: "w-full gradient-magenta-cyan text-white border-0 h-12 font-display font-bold text-base mt-2",
                        "data-ocid": "onboarding-details-next",
                        children: [
                          "Review Platform Agreement",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-2" })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        step === "disclaimer" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 gradient-magenta-cyan rounded-xl flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16, className: "text-white" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm truncate", children: "Platform Agreement & Terms of Service" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Legally binding — read carefully before proceeding" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep("details"),
                    className: "ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0",
                    children: "Back"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "overflow-y-auto rounded-2xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm shadow-elevated mb-5",
                  style: { maxHeight: "320px" },
                  "data-ocid": "disclaimer-scroll",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
                    disclaimerSections.map((section) => {
                      const Icon = section.icon;
                      const isWarning = section.variant === "warning";
                      const isDanger = section.variant === "danger";
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `rounded-xl p-4 border ${isDanger ? "bg-destructive/8 border-destructive/25" : isWarning ? "bg-accent/8 border-accent/25" : "bg-primary/6 border-primary/20"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: `w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${isDanger ? "bg-destructive/20" : isWarning ? "bg-accent/20" : "bg-primary/20"}`,
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Icon,
                                    {
                                      size: 13,
                                      className: isDanger ? "text-destructive" : isWarning ? "text-accent" : "text-primary"
                                    }
                                  )
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "h3",
                                {
                                  className: `font-display font-bold text-sm ${isDanger ? "text-destructive" : isWarning ? "text-accent" : "text-primary"}`,
                                  children: section.title
                                }
                              )
                            ] }),
                            section.content.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs text-foreground/90 leading-relaxed mb-1.5",
                                children: line
                              },
                              line
                            )),
                            "bullets" in section && section.bullets && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: section.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "li",
                              {
                                className: "flex items-start gap-2 text-xs text-foreground/85",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: `mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${isDanger ? "bg-destructive" : "bg-primary"}`
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: b })
                                ]
                              },
                              b
                            )) }),
                            "footer" in section && section.footer && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs font-semibold text-accent italic leading-relaxed", children: section.footer }),
                            "subsections" in section && section.subsections && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-3", children: section.subsections.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "bg-destructive/10 border border-destructive/20 rounded-lg p-3",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-destructive mb-1.5", children: sub.label }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: sub.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "li",
                                    {
                                      className: "flex items-start gap-2 text-xs text-foreground/90",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed font-medium", children: item })
                                      ]
                                    },
                                    item
                                  )) })
                                ]
                              },
                              sub.label
                            )) })
                          ]
                        },
                        section.id
                      );
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, "data-ocid": "disclaimer-form", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-start gap-3 rounded-xl border p-4 mb-5 transition-smooth ${agreed ? "border-primary/50 bg-primary/8" : "border-border bg-card"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          id: "disclaimer-agree",
                          checked: agreed,
                          onCheckedChange: (v) => setAgreed(!!v),
                          className: "mt-0.5 shrink-0",
                          "data-ocid": "disclaimer-checkbox"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "disclaimer-agree",
                          className: "text-xs leading-relaxed text-foreground cursor-pointer",
                          children: [
                            "I have read and agree to the",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Platform Agreement & Terms of Service" }),
                            ", including all content restrictions, financial penalties, and the commandments of Emperor Yahweh (Exodus–Deuteronomy)."
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: !agreed || register.isPending,
                    className: "w-full gradient-magenta-cyan text-white border-0 h-12 font-display font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed",
                    "data-ocid": "onboarding-submit",
                    children: register.isPending ? "Creating your profile…" : "Join YHWH Corner"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    }
  );
}
export {
  OnboardingPage as default
};
