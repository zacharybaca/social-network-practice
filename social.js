// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;

    this.users[this.currentID] = {
      id: this.currentID,
      name: name
    }

    this.follows[this.currentID] = new Set();

    return this.currentID;
  }

  getUser(userID) {
    if (!this.users[userID]) return null;
    return this.users[userID];
  }

  follow(userID1, userID2) {
    if (!this.users[userID1] || !this.users[userID2]) {
      return false;
    }
    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    const followers = new Set();

    for (let id in this.follows) {
      if (this.follows[id].has(userID)) {
        followers.add(parseInt(id))
      }
      return followers;
    }
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let recommendations = [];

    let visited = new Set();
    visited.add(userID);

    while (queue.length) {
      let path = queue.shift();
      let currNodeID = path[path.length - 1];

      if (path.length > degrees + 2) break;
      if (path.length > 2) recommendations.push(currNodeID);

      for (let follow of this.follows[currNodeID]) {
        if (!visited.has(follow)) {
          visited.add(follow);
          queue.push(...path, follow);
        }
      }
    }
    return recommendations;
  }
}

module.exports = SocialNetwork;
