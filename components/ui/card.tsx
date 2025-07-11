export function Card({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <div className="rounded-xl border bg-white shadow" {...props}>{children}</div>;
}

export function CardContent({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <div className="p-4" {...props}>{children}</div>;
}

export function CardHeader({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <div className="p-4 pb-2" {...props}>{children}</div>;
}

export function CardTitle({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <h3 className="text-lg font-semibold leading-none tracking-tight" {...props}>{children}</h3>;
}