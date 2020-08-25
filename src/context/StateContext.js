import React from 'react'

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
	const [activeCategory, setActiveCategory] = React.useState("web")

	return (
		<StateContext.Provider
			value={{
				activeCategory,
				setActiveCategory,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}