/* eslint-disable @next/next/no-img-element */
import React from "react";

interface IProps {
    children: any;
}

interface IState {
    hasError: false;
}

class ErrorBoundary extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            let audio = new Audio("/assets/audio/criticalError.mp3");
            audio.volume = 0.05;
            audio.play();
            //inline styling to ensure the component works properly
            return (
                <div
                    role="alert"
                    style={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundImage: "url(/assets/img/criticalErrorBg.png)"
                    }}
                >
                    <div
                        style={{
                            backgroundImage:
                                "url(/assets/img/criticalError.jpg)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            minHeight: "180px",
                            maxWidth: "90%",
                            borderRadius: "50px",
                            boxShadow: "-1px 1px 8px 20px #000000b0"
                        }}
                    >
                        <h2
                            style={{
                                color: "#fff",
                                backgroundColor: "#3e3e3ea8",
                                padding: "20px",
                                borderRadius: "1000px",
                                textAlign: "center"
                            }}
                        >
                            Oops! An unhandled error has occured
                        </h2>
                        <button
                            type="button"
                            onClick={() => this.setState({ hasError: false })}
                            style={{
                                padding: "10px 5px",
                                borderRadius: "15px",
                                marginBottom: "15px"
                            }}
                        >
                            Try again?
                        </button>
                        <button
                            onClick={() => document.location.reload()}
                            style={{
                                padding: "10px 5px",
                                borderRadius: "15px"
                            }}
                        >
                            Reload page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
