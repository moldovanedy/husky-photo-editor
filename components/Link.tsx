import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// @ts-ignore Binding element 'children' implicitly has an 'any' type.
const LinkComponent = ({ children, skipLocaleHandling = false, ...rest }) => {
    const router = useRouter();
    const locale = rest.locale || router.query.locale || "";

    let href = rest.href || router.asPath;
    if (href.indexOf("http") === 0) skipLocaleHandling = true;
    if (locale && !skipLocaleHandling) {
        href = href
            ? `/${locale}${href}`
            : router.pathname.replace("[locale]", locale);
    }

    return (
        <>
            <Link href={href}>
                <a {...rest}>{children}</a>
            </Link>
        </>
    );
};

export default LinkComponent;
