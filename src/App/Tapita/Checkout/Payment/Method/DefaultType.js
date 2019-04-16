/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/21/18
 * Time: 8:29 AM
 */
import MethodAbstract from '../../../../Core/Payment/MethodAbstract'

class DefaultType extends MethodAbstract{

    render(){
        return this.renderPayment();
    }
}
export default DefaultType