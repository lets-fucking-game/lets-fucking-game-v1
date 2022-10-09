const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
const { ethers } = require('hardhat')
const { expectRevert } = require('@openzeppelin/test-helpers')
const { expect } = require('chai')

let gameFactoryContract,
  GameFactoryContract,
  gameImplementationContract,
  GameImplementationContract,
  owner,
  secondAccount,
  secondGameImplementationContract,
  thirdAccount

const roundLength = 2
const maxPlayers = 10
const registrationAmount = ethers.utils.parseEther('0.0001')
const houseEdge = ethers.utils.parseEther('0.000005')
const creatorEdge = ethers.utils.parseEther('0.000005')

describe('GameFactoryContract', function () {
  beforeEach(async function () {
    ;[owner, secondAccount, thirdAccount] = await ethers.getSigners()
  })

  context('GameImplementation deployed', function () {
    describe('when an account tries to initialize the base contract', function () {
      it('should revert with the correct reason', async function () {
        GameImplementationContract = await ethers.getContractFactory(
          'GameImplementation'
        )
        gameImplementationContract = await GameImplementationContract.deploy()
        await gameImplementationContract.deployed()

        await expectRevert(
          gameImplementationContract.initialize({
            _initializer: secondAccount.address,
            _factoryOwner: owner.address,
            _gameImplementationVersion: '0',
            _gameLineId: '0',
            _roundLength: roundLength,
            _maxPlayers: maxPlayers,
            _registrationAmount: registrationAmount,
            _houseEdge: houseEdge,
            _creatorEdge: creatorEdge,
          }),
          "The implementation contract can't be initialized"
        )
      })
    })

    describe('when the creator tries to initialize a game already initialized', function () {
      it.only('should revert with the correct message', async function () {
        await createAndDeployContracts()
        await gameFactoryContract
          .connect(secondAccount)
          .createNewGameLine(maxPlayers, roundLength, registrationAmount)

        const clonedContract = await gameFactoryContract.deployedGameLines(0)
        const clonedGameContract = await GameImplementationContract.attach(
          clonedContract.deployedAddress
        )

        await expectRevert(
          clonedGameContract.initialize({
            _initializer: secondAccount.address,
            _factoryOwner: owner.address,
            _gameImplementationVersion: '0',
            _gameLineId: '0',
            _roundLength: roundLength,
            _maxPlayers: maxPlayers,
            _registrationAmount: registrationAmount,
            _houseEdge: houseEdge,
            _creatorEdge: creatorEdge,
          }),
          'Contract already initialized'
        )
      })
    })
  })

  context('GameFactory constructor', function () {
    describe('when GameFactory gets deployed', function () {
      it('should set the correct values to state variables', async function () {
        await createAndDeployContracts()

        const responseLatestGameImplementationVersionId =
          await gameFactoryContract.latestGameImplementationVersionId()
        const responseGameImplementation =
          await gameFactoryContract.gameImplementations(
            responseLatestGameImplementationVersionId
          )

        const responseOwner = await gameFactoryContract.owner()
        const responseRegistrationAmount =
          await gameFactoryContract.registrationAmount()
        const responseHouseEdge = await gameFactoryContract.houseEdge()
        const responseCreatorEdge = await gameFactoryContract.creatorEdge()

        expect(responseOwner).to.be.equal(owner.address)
        expect(responseLatestGameImplementationVersionId).to.be.equal('0')
        expect(responseGameImplementation.deployedAddress).to.be.equal(
          gameImplementationContract.address
        )
        expect(responseRegistrationAmount).to.be.equal(registrationAmount)
        expect(responseHouseEdge).to.be.equal(houseEdge)
        expect(responseCreatorEdge).to.be.equal(creatorEdge)
      })
    })
  })

  context('GameFactory createNewGame', function () {
    describe('when contract is paused', function () {
      it('should revert with correct message', async function () {
        await createAndDeployContracts()
        await gameFactoryContract.connect(owner).pause()

        await expectRevert(
          gameFactoryContract
            .connect(secondAccount)
            .createNewGameLine(maxPlayers, roundLength),
          'Pausable: paused'
        )
      })
    })

    describe('when the given maxPlayers is not in authorized range', function () {
      it('should revert with correct message', async function () {
        const outOfRangeMaxPlayers1 = 21
        const outOfRangeMaxPlayers2 = 1
        await createAndDeployContracts()

        await expectRevert(
          gameFactoryContract
            .connect(secondAccount)
            .createNewGameLine(outOfRangeMaxPlayers1, roundLength),
          'maxPlayers should not be bigger than 20'
        )

        await expectRevert(
          gameFactoryContract
            .connect(secondAccount)
            .createNewGameLine(outOfRangeMaxPlayers2, roundLength),
          'maxPlayers should be bigger than or equal to 2'
        )
      })
    })

    describe('when the given roundLength is not in authorized range', function () {
      it('should revert with correct message', async function () {
        const outOfRangeRoundLength1 = 9
        const outOfRangeRoundLength2 = 0
        await createAndDeployContracts()

        await expectRevert(
          gameFactoryContract
            .connect(secondAccount)
            .createNewGameLine(maxPlayers, outOfRangeRoundLength1),
          'roundLength should not be bigger than 8'
        )

        await expectRevert(
          gameFactoryContract
            .connect(secondAccount)
            .createNewGameLine(maxPlayers, outOfRangeRoundLength2),
          'roundLength should be bigger than 0'
        )
      })
    })

    describe('when new game gets created', function () {
      it('should create a new game with the correct data', async function () {
        await createAndDeployContracts()
        await gameFactoryContract
          .connect(secondAccount)
          .createNewGameLine(maxPlayers, roundLength)

        const newGame = await gameFactoryContract.deployedGameLines(0)

        const clonedGameContract = await GameImplementationContract.attach(
          newGame.deployedAddress
        )

        const responseGeneralAdmin = await clonedGameContract.generalAdmin()
        const responseCreator = await clonedGameContract.creator()
        const responseFactory = await clonedGameContract.factory()
        const responseGameId = await clonedGameContract.gameId()
        const responseGameImplementationVersion =
          await clonedGameContract.gameImplementationVersion()
        const responseRoundLength = await clonedGameContract.roundLength()
        const responseMaxPlayers = await clonedGameContract.maxPlayers()
        const responseRegistrationAmount =
          await clonedGameContract.registrationAmount()
        const responseHouseEdge = await clonedGameContract.houseEdge()
        const responseCreatorEdge = await clonedGameContract.creatorEdge()

        expect(responseGeneralAdmin).to.be.equal(owner.address)
        expect(responseCreator).to.be.equal(secondAccount.address)
        expect(responseFactory).to.be.equal(gameFactoryContract.address)
        expect(responseGameId).to.be.equal('0')
        expect(responseGameImplementationVersion).to.be.equal('0')
        expect(responseGameId).to.be.equal('0')
        expect(responseRoundLength).to.be.equal(roundLength)
        expect(responseMaxPlayers).to.be.equal(maxPlayers)
        expect(responseRegistrationAmount).to.be.equal(registrationAmount)
        expect(responseHouseEdge).to.be.equal(houseEdge)
        expect(responseCreatorEdge).to.be.equal(creatorEdge)
      })

      it('should add the new game in deployedGames', async function () {
        await createAndDeployContracts()
        await gameFactoryContract
          .connect(secondAccount)
          .createNewGameLine(maxPlayers, roundLength)
        await gameFactoryContract
          .connect(thirdAccount)
          .createNewGameLine(maxPlayers, roundLength)

        const firstGame = await gameFactoryContract.deployedGameLines(0)
        const secondGame = await gameFactoryContract.deployedGameLines(1)

        expect(firstGame.id).to.be.equal('0')
        expect(firstGame.versionId).to.be.equal('0')
        expect(firstGame.creator).to.be.equal(secondAccount.address)
        expect(secondGame.id).to.be.equal('1')
        expect(secondGame.versionId).to.be.equal('0')
        expect(secondGame.creator).to.be.equal(thirdAccount.address)
      })

      it('should emit the GameLineCreated event with the correct data', async function () {
        await createAndDeployContracts()
        await expect(
          gameFactoryContract
            .connect(secondAccount)
            .createNewGameLine(maxPlayers, roundLength)
        )
          .to.emit(gameFactoryContract, 'GameLineCreated')
          .withArgs('0', anyValue, '0', secondAccount.address)
      })
    })
  })

  context('GameFactory getDeployedGameLines', function () {
    it('should return all the deployed game lines', async function () {
      await createAndDeployContracts()
      await gameFactoryContract
        .connect(secondAccount)
        .createNewGameLine(maxPlayers, roundLength)
      await gameFactoryContract
        .connect(thirdAccount)
        .createNewGameLine(maxPlayers, roundLength)

      const deployedGameLines = await gameFactoryContract
        .connect(secondAccount)
        .getDeployedGameLines()

      expect(deployedGameLines.length).to.be.equal(2)
    })
  })

  context('GameFactory setAdmin', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await createAndDeployContracts()
        await expectRevert(
          gameFactoryContract
            .connect(thirdAccount)
            .setAdmin(thirdAccount.address),
          'Caller is not the admin'
        )
      })
    })

    describe('when called by admin', function () {
      it('should transfer the administration to given address', async function () {
        await createAndDeployContracts()
        await gameFactoryContract.connect(owner).setAdmin(thirdAccount.address)
        const newAdmin = await gameFactoryContract.owner()

        expect(newAdmin).to.be.equal(thirdAccount.address)
      })
    })
  })

  context('GameFactory withdrawFunds', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await createAndDeployContracts()
        await expectRevert(
          gameFactoryContract
            .connect(thirdAccount)
            .withdrawFunds(thirdAccount.address),
          'Caller is not the admin'
        )
      })
    })
  })

  context('GameFactory setNewGameImplementation', function () {
    describe('when called by non admin', function () {
      it('should revert with correct message', async function () {
        await createAndDeployContracts()
        await expectRevert(
          gameFactoryContract
            .connect(thirdAccount)
            .setNewGameImplementation(gameImplementationContract.address),
          'Caller is not the admin'
        )
      })
    })

    describe('when called by admin', function () {
      it('should add the new implementation version to gameImplementations', async function () {
        await createAndDeployContracts()
        secondGameImplementationContract =
          await GameImplementationContract.deploy()
        await secondGameImplementationContract.deployed()

        await gameFactoryContract
          .connect(owner)
          .setNewGameImplementation(secondGameImplementationContract.address)
        const responseGameImplementations1 =
          await gameFactoryContract.gameImplementations('0')
        const responseGameImplementations2 =
          await gameFactoryContract.gameImplementations('1')

        expect(responseGameImplementations1.id).to.be.equal('0')
        expect(responseGameImplementations1.deployedAddress).to.be.equal(
          gameImplementationContract.address
        )
        expect(responseGameImplementations2.id).to.be.equal('1')
        expect(responseGameImplementations2.deployedAddress).to.be.equal(
          secondGameImplementationContract.address
        )
      })
    })
  })
})

const createAndDeployContracts = async () => {
  GameFactoryContract = await ethers.getContractFactory('GameFactory')
  GameImplementationContract = await ethers.getContractFactory(
    'GameImplementation'
  )
  gameImplementationContract = await GameImplementationContract.deploy()
  await gameImplementationContract.deployed()
  gameFactoryContract = await GameFactoryContract.connect(owner).deploy(
    gameImplementationContract.address,
    // registrationAmount,
    houseEdge,
    creatorEdge
  )
  await gameFactoryContract.deployed()
}
