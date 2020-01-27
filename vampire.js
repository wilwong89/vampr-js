class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (this.creator) {
      return this.creator.numberOfVampiresFromOriginal+1;
    } else {
      return 0;
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // Iterate to root
    let result = this.descendents.filter(vamp => vamp.name === name);
    return result[0];
  }

  get descendents() {
    let descendents = [this]

    for (const childNode of this.offspring) {
      descendents = descendents.concat(childNode.descendents); // 2
    }

    return descendents;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    return this.descendents.length - 1;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    return this.descendents.filter(function(vamp) {
      return vamp.yearConverted > 1980
    })
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let seniorVampire = this.isMoreSeniorThan(vampire) ? this : vampire;
    let juniorVampire = this.isMoreSeniorThan(vampire) ? vampire : this;

    if (seniorVampire.name === juniorVampire.name) {
      return juniorVampire;
    }
    
    return seniorVampire.closestCommonAncestor(juniorVampire.creator);
  }
}

module.exports = Vampire;

