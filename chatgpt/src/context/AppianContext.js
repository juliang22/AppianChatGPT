import { createContext, useState } from "react";

const AppianContext = createContext();

export function AppianProvider({ children }) {
	const [allparameters, setAllParameters] = useState({});
	const Appian = window.Appian;
	const accentColor = Appian.getAccentColor();
	const locale = Appian.getLocale();

	Appian.Component.onNewValue(function (allparameters) {
		Appian.Component.setValidations("");
		setAllParameters(allparameters);
	});

	return <AppianContext.Provider value={{
		Appian: Appian,
		accentColor: accentColor,
		locale: locale,
		allparameters: allparameters
	}}>{children}</AppianContext.Provider>
}
export default AppianContext;
