var Calculator  = function (argument) {
	// body...
};

CalculatorInterface = {
	_IsExpressionHasExponential : function  (exp) {
		return /[\+\-\*\/]+\d*[e]+\d+[\+\-\*\/]*/g.test(exp);
	},
	_getExponentialInMathOperation: function  (exp) {
		console.log('inside math operations');
		var operations = exp.match(/[\+\-*\/]*/g),
			numbers = exp.match(/\d+/g),
			result = '';
		if (exp.match(/[\+\-\*\/]+[\d]*e/)) {
			result += exp.match(/[\+\-\*\/]+[\d]*e/)[0][0];
		}
		if (exp.match(/[\+\-\*\/]*[\d]+e/)) {
			result += exp.match(/[\d]+/)[0] + '*';
		}

		result += 'Math.pow(10, ';
		if (exp.match(/e[\+\-]+[\d]+/)) {
			result += exp.match(/e[\+\-]+[\d]+/)[0].match(/[\+\-]/)[0];
		}
		if (exp.match(/e[\+\-]*[\d]+/)) {
			result += exp.match(/e[\+\-]*[\d]+/)[0].match(/[\d]+/)[0] + ')';
		}
		if (exp.match(/e[\+\-]*[\d]+[\+\-\*\/]+/)) {
			result += exp.match(/e[\+\-]*[\d]+[\+\-\*\/]+/)[0].match(/[\d]+[\+\-\*\/]+/)[0].match(/[\+\-\*\/]+/);
		}
		console.log('exp after math opt', result);
		return result;
	},
	calculate : function  (exp) {
		var matchedExpo
		try {
			//console.log('regeex check', /[a-z]+^e/.test(exp));
			if (this._IsExpressionHasExponential(exp)) {
				console.log('before replace', exp);
				exp = exp.replace(/[\+\-\*\/]*\d*[e]+[\+\-]*\d+[\+\-\*\/]*/g, this._getExponentialInMathOperation);
				console.log('after replace', exp);
			}
			return eval(exp);

		} catch (error) {
			console.log('error', error.message);
		}
	}
};
Calculator.prototype = Object.create(CalculatorInterface);