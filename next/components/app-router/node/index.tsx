import { NodeArticle } from "@/components/app-router/node/node--article";
import { NodeFrontpage } from "@/components/app-router/node/node--frontpage";
import { NodePage } from "@/components/app-router/node/node--page";
import { NodeProduct } from "@/components/app-router/node/node--product";
import { TypedRouteEntity } from "@/types/graphql";
import { never } from "zod";

export function Node({ node }: { node: TypedRouteEntity }) {
  if (!node) return null;

  switch (node.__typename) {
    case "NodeFrontpage": {
      return <NodeFrontpage page={node} />;
    }
    case "NodePage": {
      return <NodePage page={node} />;
    }
    case "NodeArticle": {
      return <NodeArticle article={node} />;
    }
    case "NodeProduct": {
      return <NodeProduct product={node} />;
    }
    default: {
      node === typeof never;
      console.log(
        `components/node.tsx: Node type not yet implemented: ${(node as TypedRouteEntity).__typename}`,
      );
      return null;
    }
  }
}
