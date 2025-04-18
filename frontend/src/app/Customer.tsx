import { Button } from "@/components/ui/button";
import { useState } from "react";

const Customer = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Vite + React</h1>
			<div className="card">
				<Button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				{/* <button onClick={() => setCount((count) => count + 1)}> */}
				{/* 	count is {count} */}
				{/* </button> */}
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
};

export default Customer;
