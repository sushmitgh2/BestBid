// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.13;

import "./BestBidNFT.sol";

contract BestBid{

    struct Bid{
        address bidder;
        string bidHash;
        uint bidAmt;
    }

    struct Token{
        uint tokenId;
        string name;
    }

    struct Auction{
        address creator;
        string name;
        string description;
        bool status;
        uint bidCount;
        uint token;
        mapping(address => Bid) userToBid;
        mapping(uint => Bid) bids;
        Bid[] allBids;
        mapping(uint => uint) bidAmount;
        mapping(address => bool) isBidder;
        mapping(address => bool) bidWithdrawn;
        Bid highestBid;
    }

    address moderator;
    uint auctionCount;
    mapping(uint => Auction) auctions;
    mapping(uint => Token) tokens;

    Auction[] auctionsArr;

    event TokenCreated(uint indexed token);
    event AuctionCreated(uint indexed auction);

    modifier onlyModerator{
        require(msg.sender == moderator);
        _;
    } 

    modifier onlyAuctionCreator(uint auctionId) {
        require(msg.sender == auctions[auctionId].creator);
        _;
    }

    BestBidNFT BBN;

    constructor(address _BBN) {
        moderator = msg.sender;
        auctionCount = 0;
        BBN = BestBidNFT(_BBN);
    }

    function createAuction(string memory name, string memory desc, uint _token) external returns (uint){
        Auction storage auc = auctions[auctionCount];
        auc.creator = msg.sender;
        auc.name = name;
        auc.description = desc;
        auc.status = true;
        auc.bidCount = 0;
        auc.token = _token;

        auctionCount += 1;

        emit AuctionCreated(auctionCount-1);
        return auctionCount -1;
    } 

    function createToken(string memory token_name, string memory tokenUri) external returns (uint){
        uint tokenId =  BBN.createToken(msg.sender, tokenUri);

        Token storage token = tokens[tokenId];
        token.tokenId = tokenId;
        token.name = token_name;

        emit TokenCreated(tokenId);
        return tokenId;
    }

    function bidOnAuction(uint auctionId, string memory _bidHash) external payable{
        require(msg.value > 0, "Bid amount not sent");
        Auction storage auc = auctions[auctionId];
        require(auc.status == true, "Auction already awarded");
        Bid memory bid = Bid(msg.sender, _bidHash, msg.value);

        auc.allBids.push(bid);
        auc.userToBid[msg.sender] = bid;
        auc.bids[auc.bidCount] = bid;
        auc.bidAmount[auc.bidCount] = msg.value;
        auc.isBidder[msg.sender] = true;
        auc.bidWithdrawn[msg.sender] = false;

        if(auc.bidCount == 0) {
            auc.highestBid = bid;
        }else{
            if(msg.value > auc.highestBid.bidAmt) {
                auc.highestBid = bid;
            }
        }

        auc.bidCount++;
    }

    function claimBidAmount(uint auctionId) external payable {
        Auction storage auc = auctions[auctionId];
        require(auc.status == false, "Auction is still in progress");
        require(auc.isBidder[msg.sender], "Only bidder can claim their bid");
        require(auc.bidWithdrawn[msg.sender] == false, "Bidder has already claimed withdrawal");

        Bid memory bid = auc.userToBid[msg.sender];
        auc.bidWithdrawn[msg.sender] = true;
        msg.sender.call{value: bid.bidAmt}("");
    }

    function awardBidToHighestBidder(uint auctionId) external payable onlyAuctionCreator(auctionId) {
        Auction storage auc = auctions[auctionId];
        require(auc.status == true, "Auction already awarded");
        auc.status = false;
        auc.creator.call{value: auc.highestBid.bidAmt}("");
    }

    function getAuctionBidforUser(uint aunctionId) external view returns(Bid memory) {
        return auctions[aunctionId].userToBid[msg.sender];
    } 

    function getHighestBidAmountforAuction(uint auctionId) external view returns(uint) {
        return auctions[auctionId].highestBid.bidAmt;
    }

    function getHighestBidforAuction(uint auctionId) external view returns(Bid memory) {
        return auctions[auctionId].highestBid;
    }

    function getAllBids(uint auctionId) external view returns(Bid[] memory){
        return auctions[auctionId].allBids;
    }

    function getAuctionCreator(uint auctionId) external view returns(address) {
        return auctions[auctionId].creator;
    }

    function getAuction(uint auctionID) external view returns (string[3] memory) {
        Auction storage auc = auctions[auctionID];
        string[3] memory auctionDetails = [auc.name, auc.description, BBN.tokenURI(auc.token)];

        return auctionDetails;
    }

}