import { useTranslation } from '@pancakeswap/localization'
import { Flex, Heading, Skeleton, Text, WarningIcon } from '@pancakeswap/uikit'
import cronstrue from 'cronstrue'

import BigNumber from 'bignumber.js'

import ConnectWalletButton from 'components/ConnectWalletButton'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import moment from 'moment'
import ClaimButton from '../GameCardButtons/ClaimButton'
import PlayButton from '../GameCardButtons/PlayButton'
import RegisterButton from '../GameCardButtons/RegisterButton'
import VoteSplitButton from '../GameCardButtons/VoteSplitButton'
import PauseButton from '../GameCardButtons/PauseButton'
import UnpauseButton from '../GameCardButtons/UnpauseButton'

const Container = styled.div`
  margin-right: 4px;
`

const Action = styled.div`
  padding-top: 16px;
`

const ActionContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ActionTitles = styled.div`
  display: flex;
  margin-bottom: 8px;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
interface GameCardPlayerSectionProps {
  address: string
  roundId: BigNumber
  registrationAmount: BigNumber
  gameCreationAmount: BigNumber
  isInProgress: boolean
  wonAmount: BigNumber
  nextFromRange: string
  nextToRange: string
  encodedCron: string
  isPlaying: boolean
  isWonLastGames: boolean
  isCanVoteSplitPot: boolean
  isInTimeRange: boolean
  isReady: boolean
  isPaused: boolean
  isCreator: boolean
  isAdmin: boolean
  account?: string
}

const CardPlayerSection: React.FC<React.PropsWithChildren<GameCardPlayerSectionProps>> = ({
  address,
  roundId,
  registrationAmount,
  gameCreationAmount,
  isInProgress,
  wonAmount,
  nextFromRange,
  nextToRange,
  encodedCron,
  isPlaying,
  isWonLastGames,
  isCanVoteSplitPot,
  isInTimeRange,
  isReady,
  isPaused,
  isCreator,
  isAdmin,
  account,
}) => {
  const {
    t,
    // currentLanguage: { locale },
  } = useTranslation()

  // const currentDate = useMemo(

  return (
    <Action>
      {isWonLastGames && (
        <>
          <ActionContainer>
            <ActionTitles>
              <Text bold textTransform="uppercase" color="secondary" pr="4px">
                {t('Earned')}
              </Text>
            </ActionTitles>
            <ActionContent>
              {isReady ? (
                <Text bold color="success" fontSize={16}>
                  {wonAmount.toNumber()} BNB
                </Text>
              ) : (
                <Skeleton width={80} height={18} mb="4px" />
              )}
            </ActionContent>
          </ActionContainer>
          <ActionContainer>
            <ActionTitles />
            <ActionContent>
              {isReady ? (
                <ClaimButton address={address} roundId={roundId} />
              ) : (
                <Skeleton width={80} height={36} mb="4px" />
              )}
            </ActionContent>
          </ActionContainer>
        </>
      )}

      {isInProgress && isPlaying && (
        <Container>
          <Flex justifyContent="space-between">
            <Heading mr="4px">
              {`${t('Next play time')} is ${moment(nextFromRange).isSame(moment(), 'day') ? 'today' : 'tomorrow'}:`}
            </Heading>
            {isReady ? (
              <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                {nextFromRange && nextToRange && (
                  <>
                    {'Between '}
                    {moment(nextFromRange).format('hh:mm A')} and {moment(nextToRange).format('hh:mm A')}
                  </>
                )}
              </Text>
            ) : (
              <Skeleton width="100%" height={18} mb="4px" />
            )}
          </Flex>

          {isInProgress && isPlaying && !isInTimeRange && moment().isAfter(moment(nextToRange)) && (
            <Flex justifyContent="center" m="10px">
              <WarningIcon width="16px" color="failure" style={{ verticalAlign: 'middle' }} />
              <Heading mr="4px" color="failure">
                {t('You Loose')}
              </Heading>
              <WarningIcon width="16px" color="failure" style={{ verticalAlign: 'middle' }} />
            </Flex>
          )}
        </Container>
      )}

      {/* TODO ADD CONDITION IF ACCOUNT IS GAME CREATOR. If true, display play and pause button */}
      {!account ? (
        <ConnectWalletButton mt="8px" width="100%" />
      ) : (
        <>
          {isInProgress && (
            <PlayButton
              address={address}
              isInTimeRange={isInTimeRange}
              isDisabled={isPlaying || isCreator || isAdmin || isPaused}
            />
          )}
          {!isInProgress && (
            <RegisterButton
              address={address}
              registrationAmount={registrationAmount}
              isDisabled={isPlaying || isCreator || isAdmin || isPaused}
            />
          )}
          {isCanVoteSplitPot && <VoteSplitButton address={address} />}
          {(isCreator || isAdmin) && (
            <>
              {isPaused && <UnpauseButton address={address} isInProgress={isInProgress} />}
              {!isPaused && <PauseButton address={address} isInProgress={isInProgress} />}
            </>
          )}
        </>
      )}
      {/* TODO Remove after integration phase */}
      {/* <Link href="/games/1" passHref>
        <Button as="a" id="showGameDetails" mt="8px" width="100%">
          {t('Show Game Details')}
        </Button>
      </Link> */}
    </Action>
  )
}

export default CardPlayerSection
