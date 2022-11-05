import { VStack, Input, HStack, Text, Button, InputRightElement, InputGroup, Link, theme } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
    
const LoginPage = () => {
	const passwordRef = useRef<HTMLInputElement>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	//Load password from localStorage
	useEffect(() => {
		if(passwordRef.current) {
			passwordRef.current.value = localStorage.getItem("user_auth") ?? "";
		}
	}, [passwordRef]);  

	const toggleShowPassword = () => {
		setShowPassword(current => !current);
	};
	const savePassword = () => {
		localStorage.setItem("user_auth", passwordRef?.current?.value ?? "");
	};
    
	return(
		<VStack>    
			<HStack>
				<Text> Passord: </Text>

				<InputGroup size='md'>
					<Input
						ref={passwordRef}
						type={showPassword ? "text" : "password"}
						variant="outline"
						rounded={"lg"}
					/>
					<InputRightElement width='4.5rem'>
						<Button h='1.75rem' size='sm' onClick={toggleShowPassword}>
							{showPassword ? "Vis" : "Skjul"}    
						</Button>
					</InputRightElement>
				</InputGroup>
				<Link href={"/"} onClick={savePassword}> 
					<Button color={"white"} backgroundColor={theme.colors.green[400]}>Logg inn</Button>
				</Link>
			</HStack>
		</VStack>
	);
};

export default LoginPage;
