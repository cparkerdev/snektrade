import { Button } from "@blueprintjs/core";

export type AboutProps = { message: string }; /* could also use interface */
export const About = ({ message }: AboutProps) => <Button intent="success" text={message} />;