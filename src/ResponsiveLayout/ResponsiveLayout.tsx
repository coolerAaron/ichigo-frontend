import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ConditionalWraper } from "./ConditionalWrapper";

interface ValueBoxProps {
  value: string | number;
  color: string;
}

interface FlexBoxProps {
  flexGrow?: number;
  gap?: string;
  margin?: string;
  height?: string;
}

const FlexBox = styled.div<FlexBoxProps>`
  gap: ${(props) => props.gap || "1.5rem"};
  margin: ${(props) => props.margin};
  height: ${(props) => props.height};
  flex-grow: ${(props) => props.flexGrow || 1};
  display: flex;
  justify-content: space-evenly;
`;

const HBox = FlexBox;
const VBox = styled(FlexBox)`
  flex-direction: column;
`;

export const ResponsiveLayout = () => {
  const breakPoint = "(max-width: 600px)";
  const mediaMatch = window.matchMedia(breakPoint);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => mediaMatch.removeEventListener("change", handler);
  });

  //enter color map here
  const [colorPool, setColorPool] = useState([
    "#0289DF",
    "#E53458",
    "#8C7A5B",
    "#B75E61",
    "#7F00CB",
    "#01B09F",
    "#007A67",
    "#6953FE",
    "#475B6C",
  ]);

  const shuffleColorPool = () => {
    //the weird spread here was to get around carbon copied arrays not counting as state changes in react
    setColorPool([...colorPool].sort(() => Math.random() - 0.5));
  };

  const RatioBox = styled(FlexBox)`
    @media ${breakPoint} {
      flex-grow: 1.5;
    }
  `;

  const RatioVBox = styled(RatioBox)`
    flex-direction: column;
  `;

  const TopPane = styled(FlexBox)`
    margin: 0.5rem;
    flex-grow: 1.5;
    @media ${breakPoint} {
      flex-direction: column;
      flex-grow: 1;
      ${RatioVBox}:nth-child(2) {
        flex-direction: column-reverse;
      }
    }
  `;

  const BottomPane = styled(FlexBox)`
    margin: 0.5rem;
    @media ${breakPoint} {
      flex-direction: column;
    }
  `;

  const ValueBox = ({
    value,
    color,
    flexGrow,
  }: ValueBoxProps & FlexBoxProps) => {
    const ColorBox = styled.div`
      display: flex;
      background: ${color};
      flex-grow: ${flexGrow || 1};
      @media ${breakPoint} {
        flex-grow: 1;
      }
    `;
    return (
      <ColorBox onClick={shuffleColorPool}>
        <p
          style={{
            margin: "auto",
            color: "white",
            fontWeight: "bolder",
          }}
        >
          {value}
        </p>
      </ColorBox>
    );
  };

  return (
    <VBox gap="0em" height="100vh">
      <TopPane>
        <ValueBox value={1} color={colorPool[0]} />

        <RatioVBox>
          <ValueBox value={2} color={colorPool[1]} />

          <HBox>
            <ValueBox value={3} color={colorPool[2]} />
            <ValueBox value={4} color={colorPool[3]} />
          </HBox>
        </RatioVBox>
      </TopPane>
      <BottomPane>
        {matches ? <ValueBox value={7} color={colorPool[6]} /> : undefined}
        <ConditionalWraper
          condition={matches}
          wrapper={(children) => <RatioBox>{children}</RatioBox>}
        >
          <VBox>
            <ValueBox value={5} color={colorPool[4]} />
            <ValueBox value={6} color={colorPool[5]} flexGrow={1.5} />
          </VBox>
          {!matches ? <ValueBox value={7} color={colorPool[6]} /> : undefined}
          <VBox>
            <ValueBox value={8} color={colorPool[7]} flexGrow={1.5} />
            <ValueBox value={9} color={colorPool[8]} />
          </VBox>
        </ConditionalWraper>
      </BottomPane>
    </VBox>
  );
};
