import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export const InscriptionSearch = ( {onSearch} ) => {
	const [address, setAddress] = useState("");

	return (
		<div className="flex gap-4 sticky top-0">
			<form
			className="w-full flex-row gap-2"
			onSubmit={(e) => onSearch(e, address)}
			>
				<label
					htmlFor="default-search"
					className="text-sm font-medium text-gray-900 sr-only"
				>
					Put BTC Address
		  		</label>
				<div className="flex flex-row h-10 justify-between">
					<div className="justtify-self-start">
						<IoSearch className="w-8 h-8 pt-3" />
					</div>
					<input
						type="search"
						id="default-search"
						className="grow justify-self-stretch w-full h-full pl-3 rounded-lg bg-glass bg-transparent gap-2"
						placeholder="who do you want to search?"
						required
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<button
						type="submit"
						className="justify-self-end rounded border bg-blue-400 border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring"
						>
						Search
					</button>
				</div>
			</form>
	  	</div>

	);
};
export default InscriptionSearch;