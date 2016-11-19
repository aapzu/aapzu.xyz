
function Dice(el) {
    this.$el = $(el)
    this.el = this.$el[0]
    this.sides = []

    for (var i = 1; i <= 6; i++) {
        this.sides.push(new Side(this.$el.find(".side-" + i), i))
    }
}

function Side(el, number) {
    this.$el = $(el)
    this.el = this.$el[0]
    this.number = number

    this.rotationX = this.getRotation("X")
    this.rotationY = this.getRotation("Y")
}

Side.prototype.getRotation = function(axis) {
    axis = axis.toUpperCase()
    if (["X", "Y", "Z"].indexOf(axis) < 0) {
        throw "Invalid axis"
    }
    var rotation
    var transform = this.$el.css("transform")
    var regexp = new RegExp("rotate"+ axis + "\((?:\d*\.)?\d+deg\)", "i")
    if (transform) {
        var rotations = transform.match(regexp)
        if (rotations && rotations.length) {
            rotation = [0]
            return rotation.split(/(rotateX\(|deg\))/)[1]
        }
    }
    return 0
}

Side.prototype.setRotation = function(axis, deg) {
    axis = axis.toUpperCase()
    if (["X", "Y", "Z"].indexOf(axis) < 0) {
        throw "Invalid axis"
    }
    if (deg.toString().indexOf("deg") >= 0)
        deg = deg.toString().split("deg")[0]
    var transform = this.$el.css("transform")
    var regexp = new RegExp("rotate" + axis + "\(.*\})", "i")
    transform.replace(regexp, ("rotate" + axis + "(" + deg + "deg"))
    this.$el.css("transform", transform)
}