import { FC } from "react";
import styled from "styled-components";

const StyledFooter = styled.footer.attrs(() => ({ role: "contentinfo" }))`
	align-items: center;
	display: flex;
	justify-content: center;
	min-height: 100px;
`;

export const Footer: FC = () => (
	<StyledFooter>
		<p>
			<i>Last Update: December 24, 2022</i>
		</p>
	</StyledFooter>
);