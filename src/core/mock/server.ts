import {
  BannerModel,
  BrandModel,
  CartModel,
  CategoryModel,
  GoogleMapsLatLongModel,
  JiwaPointModel,
  JiwaPointTransactionModel,
  MembershipDetailModel,
  ModifierModel,
  NotificationModel,
  OutletModel,
  ProductModel,
  ProfileModel,
  ReferralListItemModel,
  ReferralModel,
  SplashScreenModel,
  UserModel,
  VariantModel,
  VariantNonSkuModel,
  TransactionEstimationModel,
  DeliveryEstimationModel,
} from '@models';
import {createServer, Registry} from 'miragejs';
import Schema from 'miragejs/orm/schema';
import {
  BannerFactory,
  CartFactory,
  JiwaPointFactory,
  JiwaPointTransactionFactory,
  MembershipDetailFactory,
  ModifierFactory,
  NotificationFactory,
  ProductFactory,
  ReferralFactory,
  ReferralListItemFactory,
  SplashScreenFactory,
  VariantFactory,
  VariantNonSkuFactory,
  TransactionEstimationFactory,
  DeliveryEstimationFactory,
  ProfileFactory,
} from './factories';
import BrandFactory from './factories/Brand';
import CategoryFactory from './factories/Category';
import GoogleMapsByLatLongFactory from './factories/GoogleMapsByLatLong';
import OutletFactory from './factories/Outlet';
import registerAuthRoutes from './routes/auth';
import registerCartRoutes from './routes/cart';
import registerGoogleMaps from './routes/googleMaps';
import registerMembershipRoutes from './routes/memberships';
import registerNotificationRoutes from './routes/notifications';
import registerOutletRoutes from './routes/outlet';
import registerProductRoutes from './routes/product';
import registerStoryRoutes from './routes/stories';
import registerUserRoutes from './routes/user';
import registerTransactionRoutes from './routes/transaction';
import registerDeliveryRoutes from './routes/delivery';

export type AppRegistry = Registry<
  {
    banner: typeof BannerModel;
    user: typeof UserModel;
    membershipDetail: typeof MembershipDetailModel;
    referral: typeof ReferralModel;
    referralListItem: typeof ReferralListItemModel;
    jiwaPoint: typeof JiwaPointModel;
    jiwaPointTransaction: typeof JiwaPointTransactionModel;
    product: typeof ProductModel;
    variant: typeof VariantModel;
    variantNonSku: typeof VariantNonSkuModel;
    modifier: typeof ModifierModel;
    cart: typeof CartModel;
    notification: typeof NotificationModel;
    googleMap: typeof GoogleMapsLatLongModel;
    category: typeof CategoryModel;
    brand: typeof BrandModel;
    outlet: typeof OutletModel;
    splashScreen: typeof SplashScreenModel;
    transactionEstimation: typeof TransactionEstimationModel;
    deliveryEstimation: typeof DeliveryEstimationModel;
    profile: typeof ProfileModel;
  },
  {}
>;

export type AppSchema = Schema<AppRegistry>;

const mockServer = () =>
  createServer({
    environment: 'development',
    models: {
      banner: BannerModel,
      membershipDetail: MembershipDetailModel,
      referral: ReferralModel,
      referralListItem: ReferralListItemModel,
      jiwaPoint: JiwaPointModel,
      user: UserModel,
      jiwaPointTransaction: JiwaPointTransactionModel,
      product: ProductModel,
      variant: VariantModel,
      variantNonSku: VariantNonSkuModel,
      modifier: ModifierModel,
      cart: CartModel,
      notification: NotificationModel,
      outlet: OutletModel,
      googleMap: GoogleMapsLatLongModel,
      brand: BrandModel,
      category: CategoryModel,
      deliveryEstimation: DeliveryEstimationModel,
      splashScreen: SplashScreenModel,
      transactionEstimation: TransactionEstimationModel,
      profile: ProfileModel,
      transactionEstimation: TransactionEstimationModel,
    },
    factories: {
      banner: BannerFactory,
      membershipDetail: MembershipDetailFactory,
      referral: ReferralFactory,
      referralListItem: ReferralListItemFactory,
      jiwaPoint: JiwaPointFactory,
      jiwaPointTransaction: JiwaPointTransactionFactory,
      product: ProductFactory,
      variant: VariantFactory,
      variantNonSku: VariantNonSkuFactory,
      modifier: ModifierFactory,
      cart: CartFactory,
      notification: NotificationFactory,
      googleMap: GoogleMapsByLatLongFactory,
      outlet: OutletFactory,
      brand: BrandFactory,
      category: CategoryFactory,
      splashScreen: SplashScreenFactory,
      transactionEstimation: TransactionEstimationFactory,
      deliveryEstimation: DeliveryEstimationFactory,
      profile: ProfileFactory,
    },
    seeds(server) {
      server.createList('banner', 6);
      server.create('membershipDetail');
      server.create('referral');
      server.createList('referralListItem', 20);
      server.create('jiwaPoint');
      server.createList('jiwaPointTransaction', 20);
      server.createList('notification', 20);
      server.create('googleMap');
      server.createList('category', 10);
      server.createList('outlet', 100);
      server.createList('brand', 4);
      server.createList('product', 200);
      server.createList('cart', 5);
      server.createList('splashScreen', 5);
      server.create('transactionEstimation');
      server.createList('deliveryEstimation', 4);
      server.create('profile');
      server.createList('profile', 10);
      server.createList('profile', 10);
    },
    routes() {
      registerStoryRoutes(this);
      registerMembershipRoutes(this);
      registerProductRoutes(this);
      registerCartRoutes(this);
      registerNotificationRoutes(this);
      registerTransactionRoutes(this);
      registerProductRoutes(this);
      registerOutletRoutes(this);
      registerGoogleMaps(this);
      registerUserRoutes(this);
      registerAuthRoutes(this);
      registerDeliveryRoutes(this);
    },
  });

export default mockServer;
