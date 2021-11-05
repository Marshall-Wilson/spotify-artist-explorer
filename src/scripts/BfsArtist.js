// class for storing relevant information about artists during the 
// BFS search process
class BfsArtist {
    constructor(artist, prev, prevCollab) {
        this.artist = artist;
        this.prev = prev;
        this.id = artist.id;
        this.prevCollab = prevCollab
    }

    // recursively generates an array containing this artist and its predecessors in order
    getPredecessors() {
        if (this.prev === null) {
            return [this];
        }
        let preds = [this];
        preds = preds.concat(this.prev.getPredecessors());
        return preds;
    }
}

export default BfsArtist